import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  decimal,
  boolean,
} from "drizzle-orm/mysql-core";

// ─── Users ───────────────────────────────────────────────────────────────────
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Suppliers ───────────────────────────────────────────────────────────────
export const suppliers = mysqlTable("suppliers", {
  id: int("id").autoincrement().primaryKey(),
  // 关联提交入驻申请的用户（可为空，允许游客提交）
  userId: int("userId"),
  companyName: varchar("companyName", { length: 255 }).notNull(),
  companyNameEn: varchar("companyNameEn", { length: 255 }),
  contactName: varchar("contactName", { length: 128 }).notNull(),
  contactEmail: varchar("contactEmail", { length: 320 }).notNull(),
  contactPhone: varchar("contactPhone", { length: 64 }),
  website: varchar("website", { length: 512 }),
  description: text("description"),
  // 服务类型：多个用逗号分隔
  serviceTypes: text("serviceTypes"),
  // 覆盖国家/地区：多个用逗号分隔
  coverageCountries: text("coverageCountries"),
  // 审核状态
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  // 签约状态：是否为金牌服务商
  isSigned: boolean("isSigned").default(false).notNull(),
  // 权重分（签约服务商 100，普通服务商 10）
  weight: int("weight").default(10).notNull(),
  // 成立年份
  foundedYear: int("foundedYear"),
  // 团队规模
  teamSize: varchar("teamSize", { length: 64 }),
  // 服务案例数量
  caseCount: int("caseCount").default(0),
  // 评分（0-5）
  rating: decimal("rating", { precision: 3, scale: 1 }).default("0.0"),
  logoUrl: text("logoUrl"),
  rejectReason: text("rejectReason"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Supplier = typeof suppliers.$inferSelect;
export type InsertSupplier = typeof suppliers.$inferInsert;

// ─── Service Requests（撮合订单）────────────────────────────────────────────
export const serviceRequests = mysqlTable("service_requests", {
  id: int("id").autoincrement().primaryKey(),
  // 发起询价的企业用户
  userId: int("userId").notNull(),
  userName: varchar("userName", { length: 128 }),
  userEmail: varchar("userEmail", { length: 320 }),
  // 目标服务商
  supplierId: int("supplierId").notNull(),
  supplierName: varchar("supplierName", { length: 255 }),
  // 需求描述
  title: varchar("title", { length: 512 }).notNull(),
  description: text("description"),
  // 目标国家/地区
  targetCountry: varchar("targetCountry", { length: 128 }),
  // 服务类型
  serviceType: varchar("serviceType", { length: 128 }),
  // 预算范围
  budget: varchar("budget", { length: 128 }),
  // 订单状态
  status: mysqlEnum("status", ["pending", "contacted", "in_progress", "completed", "cancelled"])
    .default("pending")
    .notNull(),
  // 平台服务费（撮合成功后收取）
  platformFee: decimal("platformFee", { precision: 10, scale: 2 }),
  // 服务费是否已结算
  feeSettled: boolean("feeSettled").default(false),
  adminNote: text("adminNote"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ServiceRequest = typeof serviceRequests.$inferSelect;
export type InsertServiceRequest = typeof serviceRequests.$inferInsert;

// ─── Knowledge Articles（知识库文章，用于 RAG 上下文）────────────────────────
export const knowledgeArticles = mysqlTable("knowledge_articles", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 512 }).notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 128 }),
  country: varchar("country", { length: 128 }),
  tags: text("tags"),
  isPublished: boolean("isPublished").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type KnowledgeArticle = typeof knowledgeArticles.$inferSelect;
export type InsertKnowledgeArticle = typeof knowledgeArticles.$inferInsert;

// ─── Chat History（问答历史）────────────────────────────────────────────────
export const chatHistory = mysqlTable("chat_history", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 128 }).notNull(),
  userId: int("userId"),
  role: mysqlEnum("role", ["user", "assistant"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatHistory.$inferSelect;
export type InsertChatMessage = typeof chatHistory.$inferInsert;
