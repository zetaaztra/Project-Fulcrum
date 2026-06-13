import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  real,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const roleEnum = pgEnum("role", [
  "entrepreneur",
  "builder",
  "coordinator",
  "admin",
  "super_admin",
]);

export const journeyStageEnum = pgEnum("journey_stage", [
  "idea",
  "builder_assigned",
  "documents",
  "applied",
  "under_review",
  "approved",
  "rejected",
  "revenue",
  "employer",
]);

export const documentStatusEnum = pgEnum("document_status", [
  "not_uploaded",
  "pending",
  "verified",
  "needs_reupload",
]);

export const applicationStatusEnum = pgEnum("application_status", [
  "draft",
  "submitted",
  "under_review",
  "approved",
  "rejected",
  "disbursed",
]);

export const schemeTypeEnum = pgEnum("scheme_type", [
  "loan",
  "grant",
  "subsidy",
  "equity",
]);

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  phone: text("phone").notNull().unique(),
  name: text("name").notNull(),
  role: roleEnum("role").notNull().default("entrepreneur"),
  avatarUrl: text("avatar_url"),
  district: text("district"),
  state: text("state").default("Tamil Nadu"),
  language: text("language").default("en"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const entrepreneursTable = pgTable("entrepreneurs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  businessName: text("business_name"),
  sector: text("sector"),
  district: text("district"),
  state: text("state").default("Tamil Nadu"),
  currentStage: journeyStageEnum("current_stage").notNull().default("idea"),
  assignedBuilderId: integer("assigned_builder_id"),
  monthlyRevenue: integer("monthly_revenue").default(0),
  employeeCount: integer("employee_count").default(0),
  loanAmount: integer("loan_amount"),
  businessAge: integer("business_age").default(0),
  community: text("community"),
  bio: text("bio"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const buildersTable = pgTable("builders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  organization: text("organization"),
  district: text("district"),
  state: text("state").default("Tamil Nadu"),
  expertise: text("expertise").array(),
  languages: text("languages").array(),
  bio: text("bio"),
  rating: real("rating").default(4.5),
  businessesHelped: integer("businesses_helped").default(0),
  successRate: real("success_rate").default(85),
  totalFundingMobilized: integer("total_funding_mobilized").default(0),
  isAvailable: boolean("is_available").notNull().default(true),
  isVerified: boolean("is_verified").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const schemesTable = pgTable("schemes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  ministry: text("ministry").notNull(),
  schemeType: schemeTypeEnum("scheme_type").notNull().default("loan"),
  sector: text("sector"),
  community: text("community"),
  minFunding: integer("min_funding").notNull(),
  maxFunding: integer("max_funding").notNull(),
  subsidyPercent: real("subsidy_percent").default(0),
  interestRate: real("interest_rate").default(7.5),
  description: text("description"),
  eligibility: text("eligibility"),
  applicationUrl: text("application_url"),
  documentsRequired: text("documents_required").array(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const documentsTable = pgTable("documents", {
  id: serial("id").primaryKey(),
  entrepreneurId: integer("entrepreneur_id")
    .notNull()
    .references(() => entrepreneursTable.id),
  name: text("name").notNull(),
  docType: text("doc_type").notNull(),
  status: documentStatusEnum("status").notNull().default("not_uploaded"),
  fileUrl: text("file_url"),
  builderNote: text("builder_note"),
  isRequired: boolean("is_required").notNull().default(true),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const applicationsTable = pgTable("applications", {
  id: serial("id").primaryKey(),
  entrepreneurId: integer("entrepreneur_id")
    .notNull()
    .references(() => entrepreneursTable.id),
  schemeId: integer("scheme_id")
    .notNull()
    .references(() => schemesTable.id),
  status: applicationStatusEnum("status").notNull().default("draft"),
  amountRequested: integer("amount_requested"),
  amountApproved: integer("amount_approved"),
  subsidyAmount: integer("subsidy_amount"),
  bankName: text("bank_name"),
  branchName: text("branch_name"),
  submittedAt: timestamp("submitted_at"),
  approvedAt: timestamp("approved_at"),
  expectedDate: timestamp("expected_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const journeysTable = pgTable("journeys", {
  id: serial("id").primaryKey(),
  entrepreneurId: integer("entrepreneur_id")
    .notNull()
    .references(() => entrepreneursTable.id)
    .unique(),
  currentStage: journeyStageEnum("current_stage").notNull().default("idea"),
  currentApplicationId: integer("current_application_id"),
  narrativeText: text("narrative_text"),
  progressPercent: integer("progress_percent").default(15),
  daysInStage: integer("days_in_stage").default(0),
  totalDaysInJourney: integer("total_days_in_journey").default(0),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const journeyEventsTable = pgTable("journey_events", {
  id: serial("id").primaryKey(),
  entrepreneurId: integer("entrepreneur_id")
    .notNull()
    .references(() => entrepreneursTable.id),
  eventType: text("event_type").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  metadata: text("metadata"),
  occurredAt: timestamp("occurred_at").notNull().defaultNow(),
});

export const conversationsTable = pgTable("conversations", {
  id: serial("id").primaryKey(),
  entrepreneurId: integer("entrepreneur_id")
    .notNull()
    .references(() => entrepreneursTable.id),
  builderId: integer("builder_id")
    .notNull()
    .references(() => buildersTable.id),
  lastMessage: text("last_message"),
  lastMessageAt: timestamp("last_message_at").defaultNow(),
  unreadCount: integer("unread_count").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const messagesTable = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id")
    .notNull()
    .references(() => conversationsTable.id),
  senderId: integer("sender_id")
    .notNull()
    .references(() => usersTable.id),
  content: text("content").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  sentAt: timestamp("sent_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(usersTable).omit({
  id: true,
  createdAt: true,
});
export const selectUserSchema = createSelectSchema(usersTable);
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof usersTable.$inferSelect;

export const insertEntrepreneurSchema = createInsertSchema(
  entrepreneursTable,
).omit({ id: true, createdAt: true });
export type InsertEntrepreneur = z.infer<typeof insertEntrepreneurSchema>;
export type Entrepreneur = typeof entrepreneursTable.$inferSelect;

export const insertBuilderSchema = createInsertSchema(buildersTable).omit({
  id: true,
  createdAt: true,
});
export type InsertBuilder = z.infer<typeof insertBuilderSchema>;
export type Builder = typeof buildersTable.$inferSelect;

export const insertSchemeSchema = createInsertSchema(schemesTable).omit({
  id: true,
  createdAt: true,
});
export type InsertScheme = z.infer<typeof insertSchemeSchema>;
export type Scheme = typeof schemesTable.$inferSelect;

export const insertDocumentSchema = createInsertSchema(documentsTable).omit({
  id: true,
  updatedAt: true,
});
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documentsTable.$inferSelect;

export const insertApplicationSchema = createInsertSchema(
  applicationsTable,
).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applicationsTable.$inferSelect;

export const insertMessageSchema = createInsertSchema(messagesTable).omit({
  id: true,
  sentAt: true,
});
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messagesTable.$inferSelect;
