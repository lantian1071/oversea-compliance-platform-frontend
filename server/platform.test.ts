import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import { COOKIE_NAME } from "../shared/const";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): { ctx: TrpcContext; clearedCookies: Array<{ name: string; options: Record<string, unknown> }> } {
  const clearedCookies: Array<{ name: string; options: Record<string, unknown> }> = [];
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  const ctx: TrpcContext = {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
    } as TrpcContext["res"],
  };
  return { ctx, clearedCookies };
}

function createUserContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as TrpcContext["res"],
  };
}

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as TrpcContext["res"],
  };
}

// ─── Auth Tests ──────────────────────────────────────────────────────────────
describe("auth", () => {
  it("me returns null for unauthenticated user", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result).toBeNull();
  });

  it("me returns user for authenticated user", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.me();
    expect(result).not.toBeNull();
    expect(result?.email).toBe("admin@example.com");
  });

  it("logout clears session cookie", async () => {
    const { ctx, clearedCookies } = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
    expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
    expect(clearedCookies[0]?.options).toMatchObject({ maxAge: -1 });
  });
});

// ─── Suppliers Tests ─────────────────────────────────────────────────────────
describe("suppliers", () => {
  it("list returns suppliers for public users", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.suppliers.list({ limit: 5 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("list filters by country", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.suppliers.list({ country: "新加坡", limit: 10 });
    expect(Array.isArray(result)).toBe(true);
    // All results should include 新加坡 in coverage countries
    result.forEach((s) => {
      if (s.coverageCountries) {
        expect(s.coverageCountries).toContain("新加坡");
      }
    });
  });

  it("adminList requires admin role", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.suppliers.adminList()).rejects.toThrow();
  });

  it("adminList succeeds for admin", async () => {
    const { ctx } = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.suppliers.adminList();
    expect(Array.isArray(result)).toBe(true);
  });
});

// ─── Service Requests Tests ──────────────────────────────────────────────────
describe("serviceRequests", () => {
  it("myRequests requires authentication", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.serviceRequests.myRequests()).rejects.toThrow();
  });

  it("myRequests returns array for authenticated user", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.serviceRequests.myRequests();
    expect(Array.isArray(result)).toBe(true);
  });

  it("adminList requires admin role", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.serviceRequests.adminList()).rejects.toThrow();
  });
});

// ─── Knowledge Tests ─────────────────────────────────────────────────────────
describe("knowledge", () => {
  it("articles returns array for public users", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.knowledge.articles({});
    expect(Array.isArray(result)).toBe(true);
  });

  it("history returns empty array for new session", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.knowledge.history({ sessionId: "test-session-xyz-999" });
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);
  });
});

// ─── Service Request Create Tests ──────────────────────────────────────────
describe("serviceRequests.create", () => {
  it("requires authentication", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.serviceRequests.create({
        supplierId: 1,
        supplierName: "Test Supplier",
        title: "Test inquiry request",
      })
    ).rejects.toThrow();
  });

  it("validates title length", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);
    await expect(
      caller.serviceRequests.create({
        supplierId: 1,
        supplierName: "Test Supplier",
        title: "Hi", // too short, min 5 chars
      })
    ).rejects.toThrow();
  });
});

// ─── Supplier Sorting Tests ───────────────────────────────────────────────────
describe("suppliers sorting", () => {
  it("signed suppliers have higher weight than unsigned", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.suppliers.list({ limit: 20 });
    // Find first signed and first unsigned supplier
    const signedIdx = result.findIndex((s) => s.isSigned);
    const unsignedIdx = result.findIndex((s) => !s.isSigned);
    // If both exist, signed should appear before unsigned
    if (signedIdx !== -1 && unsignedIdx !== -1) {
      expect(signedIdx).toBeLessThan(unsignedIdx);
    }
  });
});

// ─── Stats Tests ─────────────────────────────────────────────────────────────
describe("stats", () => {
  it("platform returns stats object", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.stats.platform();
    expect(result).toHaveProperty("supplierCount");
    expect(result).toHaveProperty("requestCount");
    expect(typeof result.supplierCount).toBe("number");
  });
});
