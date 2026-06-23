import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { invokeLLM, type Message } from "./_core/llm";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import {
  createServiceRequest,
  createSupplier,
  getAllServiceRequests,
  getAllSuppliersAdmin,
  getChatHistory,
  getKnowledgeArticles,
  getPlatformStats,
  getServiceRequestsByUser,
  getSupplierById,
  getSuppliers,
  saveChatMessage,
  searchKnowledgeArticles,
  updateServiceRequestStatus,
  updateSupplierSigned,
  updateSupplierStatus,
} from "./db";

// ─── Admin guard ──────────────────────────────────────────────────────────────
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "需要管理员权限" });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,

  // ─── Auth ──────────────────────────────────────────────────────────────────
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── Suppliers ─────────────────────────────────────────────────────────────
  suppliers: router({
    list: publicProcedure
      .input(
        z.object({
          country: z.string().optional(),
          serviceType: z.string().optional(),
          limit: z.number().min(1).max(100).default(20),
          offset: z.number().min(0).default(0),
        })
      )
      .query(async ({ input }) => {
        return getSuppliers(input);
      }),

    detail: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const supplier = await getSupplierById(input.id);
        if (!supplier) throw new TRPCError({ code: "NOT_FOUND", message: "服务商不存在" });
        return supplier;
      }),

    submitApplication: publicProcedure
      .input(
        z.object({
          companyName: z.string().min(2),
          companyNameEn: z.string().optional(),
          contactName: z.string().min(2),
          contactEmail: z.string().email(),
          contactPhone: z.string().optional(),
          website: z.string().optional(),
          description: z.string().min(20),
          serviceTypes: z.array(z.string()).min(1),
          coverageCountries: z.array(z.string()).min(1),
          foundedYear: z.number().optional(),
          teamSize: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        await createSupplier({
          userId: ctx.user?.id ?? null,
          companyName: input.companyName,
          companyNameEn: input.companyNameEn,
          contactName: input.contactName,
          contactEmail: input.contactEmail,
          contactPhone: input.contactPhone,
          website: input.website,
          description: input.description,
          serviceTypes: input.serviceTypes.join(","),
          coverageCountries: input.coverageCountries.join(","),
          foundedYear: input.foundedYear,
          teamSize: input.teamSize,
          status: "pending",
          isSigned: false,
          weight: 10,
        });
        await notifyOwner({
          title: "新服务商入驻申请",
          content: `${input.companyName} 提交了入驻申请，请及时审核。`,
        });
        return { success: true };
      }),

    // Admin
    adminList: adminProcedure.query(async () => {
      return getAllSuppliersAdmin();
    }),

    approve: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await updateSupplierStatus(input.id, "approved");
        return { success: true };
      }),

    reject: adminProcedure
      .input(z.object({ id: z.number(), reason: z.string().optional() }))
      .mutation(async ({ input }) => {
        await updateSupplierStatus(input.id, "rejected", input.reason);
        return { success: true };
      }),

    setSigned: adminProcedure
      .input(z.object({ id: z.number(), isSigned: z.boolean() }))
      .mutation(async ({ input }) => {
        await updateSupplierSigned(input.id, input.isSigned);
        return { success: true };
      }),
  }),

  // ─── Service Requests ──────────────────────────────────────────────────────
  serviceRequests: router({
    create: protectedProcedure
      .input(
        z.object({
          supplierId: z.number(),
          supplierName: z.string(),
          title: z.string().min(5),
          description: z.string().optional(),
          targetCountry: z.string().optional(),
          serviceType: z.string().optional(),
          budget: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        await createServiceRequest({
          userId: ctx.user.id,
          userName: ctx.user.name ?? undefined,
          userEmail: ctx.user.email ?? undefined,
          supplierId: input.supplierId,
          supplierName: input.supplierName,
          title: input.title,
          description: input.description,
          targetCountry: input.targetCountry,
          serviceType: input.serviceType,
          budget: input.budget,
          status: "pending",
        });
        await notifyOwner({
          title: "新服务撮合请求",
          content: `用户 ${ctx.user.name ?? ctx.user.email} 向 ${input.supplierName} 发起了服务请求：${input.title}`,
        });
        return { success: true };
      }),

    myRequests: protectedProcedure.query(async ({ ctx }) => {
      return getServiceRequestsByUser(ctx.user.id);
    }),

    // Admin
    adminList: adminProcedure.query(async () => {
      return getAllServiceRequests();
    }),

    updateStatus: adminProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum(["pending", "contacted", "in_progress", "completed", "cancelled"]),
          platformFee: z.string().optional(),
          feeSettled: z.boolean().optional(),
          adminNote: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await updateServiceRequestStatus(input.id, input.status, {
          platformFee: input.platformFee,
          feeSettled: input.feeSettled,
          adminNote: input.adminNote,
        });
        return { success: true };
      }),
  }),

  // ─── Knowledge / AI Q&A ────────────────────────────────────────────────────
  knowledge: router({
    articles: publicProcedure
      .input(
        z.object({
          country: z.string().optional(),
          category: z.string().optional(),
        })
      )
      .query(async ({ input }) => {
        return getKnowledgeArticles(input);
      }),

    chat: publicProcedure
      .input(
        z.object({
          sessionId: z.string(),
          message: z.string().min(1),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // 保存用户消息
        await saveChatMessage({
          sessionId: input.sessionId,
          userId: ctx.user?.id ?? null,
          role: "user",
          content: input.message,
        });

        // 搜索相关知识库文章作为上下文
        const relatedArticles = await searchKnowledgeArticles(input.message);
        const context =
          relatedArticles.length > 0
            ? `\n\n以下是相关的知识库参考资料：\n${relatedArticles
                .map((a) => `【${a.title}】\n${a.content.substring(0, 800)}`)
                .join("\n\n---\n\n")}`
            : "";

        // 获取历史对话（最近10条）
        const history = await getChatHistory(input.sessionId);
        const recentHistory = history.slice(-10);

        const systemContent = `你是一位专业的出海合规顾问，专门为中国企业的HR及相关人员提供海外合规咨询服务。你的专业领域包括：海外劳动法、工作签证与工作许可、薪酬合规、社会保险、EOR服务、公司注册等。\n\n请用专业、清晰、有条理的中文回答用户的问题。如果问题涉及具体国家或地区，请提供该地区的具体法规信息。如果你不确定某些信息，请明确说明并建议用户咨询当地专业律师或顾问。${context}`;
        const messages: Message[] = [
          { role: "system", content: systemContent },
          ...recentHistory.map((m) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
          { role: "user", content: input.message },
        ];

        const response = await invokeLLM({ messages });
        const rawContent = response.choices[0]?.message?.content;
        const assistantMessage =
          typeof rawContent === "string"
            ? rawContent
            : Array.isArray(rawContent)
              ? rawContent
                  .filter((p): p is { type: "text"; text: string } => p.type === "text")
                  .map((p) => p.text)
                  .join("")
              : "抱歉，我暂时无法回答这个问题，请稍后再试。";

        // 保存助手回复
        await saveChatMessage({
          sessionId: input.sessionId,
          userId: ctx.user?.id ?? null,
          role: "assistant",
          content: assistantMessage,
        });

        return { message: assistantMessage };
      }),

    history: publicProcedure
      .input(z.object({ sessionId: z.string() }))
      .query(async ({ input }) => {
        return getChatHistory(input.sessionId);
      }),
  }),

  // ─── Stats ─────────────────────────────────────────────────────────────────
  stats: router({
    platform: publicProcedure.query(async () => {
      return getPlatformStats();
    }),
  }),
});

export type AppRouter = typeof appRouter;
