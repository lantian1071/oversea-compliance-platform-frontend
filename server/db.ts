import { and, desc, eq, like, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  chatHistory,
  knowledgeArticles,
  serviceRequests,
  suppliers,
  users,
  type InsertChatMessage,
  type InsertServiceRequest,
  type InsertSupplier,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── Users ────────────────────────────────────────────────────────────────────
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  textFields.forEach((field) => {
    const value = user[field];
    if (value === undefined) return;
    const normalized = value ?? null;
    values[field] = normalized;
    updateSet[field] = normalized;
  });
  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }
  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

// ─── Suppliers ────────────────────────────────────────────────────────────────
export async function getSuppliers(opts?: {
  country?: string;
  serviceType?: string;
  status?: "pending" | "approved" | "rejected";
  limit?: number;
  offset?: number;
}) {
  const db = await getDb();
  if (!db) return [];

  const conditions = [];
  if (opts?.status) {
    conditions.push(eq(suppliers.status, opts.status));
  } else {
    conditions.push(eq(suppliers.status, "approved"));
  }
  if (opts?.country) {
    conditions.push(like(suppliers.coverageCountries, `%${opts.country}%`));
  }
  if (opts?.serviceType) {
    conditions.push(like(suppliers.serviceTypes, `%${opts.serviceType}%`));
  }

  return db
    .select()
    .from(suppliers)
    .where(and(...conditions))
    .orderBy(desc(suppliers.weight), desc(suppliers.rating))
    .limit(opts?.limit ?? 50)
    .offset(opts?.offset ?? 0);
}

export async function getAllSuppliersAdmin() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(suppliers).orderBy(desc(suppliers.createdAt));
}

export async function getSupplierById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(suppliers).where(eq(suppliers.id, id)).limit(1);
  return result[0];
}

export async function createSupplier(data: InsertSupplier) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(suppliers).values(data);
  return result;
}

export async function updateSupplierStatus(
  id: number,
  status: "approved" | "rejected",
  rejectReason?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const weight = status === "approved" ? 10 : 0;
  await db
    .update(suppliers)
    .set({ status, rejectReason: rejectReason ?? null, weight })
    .where(eq(suppliers.id, id));
}

export async function updateSupplierSigned(id: number, isSigned: boolean) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const weight = isSigned ? 100 : 10;
  await db.update(suppliers).set({ isSigned, weight }).where(eq(suppliers.id, id));
}

// ─── Service Requests ─────────────────────────────────────────────────────────
export async function createServiceRequest(data: InsertServiceRequest) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(serviceRequests).values(data);
}

export async function getServiceRequestsByUser(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(serviceRequests)
    .where(eq(serviceRequests.userId, userId))
    .orderBy(desc(serviceRequests.createdAt));
}

export async function getAllServiceRequests() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(serviceRequests).orderBy(desc(serviceRequests.createdAt));
}

export async function updateServiceRequestStatus(
  id: number,
  status: "pending" | "contacted" | "in_progress" | "completed" | "cancelled",
  opts?: { platformFee?: string; feeSettled?: boolean; adminNote?: string }
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(serviceRequests)
    .set({
      status,
      ...(opts?.platformFee !== undefined ? { platformFee: opts.platformFee } : {}),
      ...(opts?.feeSettled !== undefined ? { feeSettled: opts.feeSettled } : {}),
      ...(opts?.adminNote !== undefined ? { adminNote: opts.adminNote } : {}),
    })
    .where(eq(serviceRequests.id, id));
}

// ─── Knowledge Articles ───────────────────────────────────────────────────────
export async function getKnowledgeArticles(opts?: { country?: string; category?: string }) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [eq(knowledgeArticles.isPublished, true)];
  if (opts?.country) conditions.push(like(knowledgeArticles.country, `%${opts.country}%`));
  if (opts?.category) conditions.push(eq(knowledgeArticles.category, opts.category));
  return db
    .select()
    .from(knowledgeArticles)
    .where(and(...conditions))
    .orderBy(desc(knowledgeArticles.createdAt));
}

export async function searchKnowledgeArticles(query: string) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(knowledgeArticles)
    .where(
      and(
        eq(knowledgeArticles.isPublished, true),
        or(
          like(knowledgeArticles.title, `%${query}%`),
          like(knowledgeArticles.content, `%${query}%`),
          like(knowledgeArticles.tags, `%${query}%`)
        )
      )
    )
    .limit(5);
}

// ─── Chat History ─────────────────────────────────────────────────────────────
export async function saveChatMessage(data: InsertChatMessage) {
  const db = await getDb();
  if (!db) return;
  await db.insert(chatHistory).values(data);
}

export async function getChatHistory(sessionId: string) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(chatHistory)
    .where(eq(chatHistory.sessionId, sessionId))
    .orderBy(chatHistory.createdAt)
    .limit(50);
}

// ─── Stats ────────────────────────────────────────────────────────────────────
export async function getPlatformStats() {
  const db = await getDb();
  if (!db) return { supplierCount: 0, requestCount: 0, completedCount: 0 };

  const [supplierResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(suppliers)
    .where(eq(suppliers.status, "approved"));

  const [requestResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(serviceRequests);

  const [completedResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(serviceRequests)
    .where(eq(serviceRequests.status, "completed"));

  return {
    supplierCount: Number(supplierResult?.count ?? 0),
    requestCount: Number(requestResult?.count ?? 0),
    completedCount: Number(completedResult?.count ?? 0),
  };
}
