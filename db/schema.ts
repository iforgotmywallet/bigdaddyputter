import { boolean, char, index, integer, numeric, pgTable, primaryKey, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";

export const putters = pgTable("putters", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  brand: varchar("brand", { length: 100 }).notNull(),
  model: varchar("model", { length: 120 }).notNull(),
  modelFamily: varchar("model_family", { length: 120 }),
  releaseYear: integer("release_year"),
  category: varchar("category", { length: 120 }),
  status: varchar("status", { length: 24 }).notNull(),
  headStyle: varchar("head_style", { length: 120 }),
  headMaterial: varchar("head_material", { length: 120 }),
  finish: varchar("finish", { length: 120 }),
  neckType: varchar("neck_type", { length: 120 }),
  alignmentAid: varchar("alignment_aid", { length: 160 }),
  lengthInches: numeric("length_inches", { precision: 5, scale: 2, mode: "number" }),
  loftDegrees: numeric("loft_degrees", { precision: 4, scale: 2, mode: "number" }),
  lieDegrees: numeric("lie_degrees", { precision: 5, scale: 2, mode: "number" }),
  headWeightGrams: integer("head_weight_grams"),
  shaft: varchar("shaft", { length: 160 }),
  grip: varchar("grip", { length: 160 }),
  headcover: varchar("headcover", { length: 160 }),
  paintFill: varchar("paint_fill", { length: 160 }),
  coaStatus: varchar("coa_status", { length: 80 }),
  serialNumber: varchar("serial_number", { length: 160 }),
  conditionScore: numeric("condition_score", { precision: 4, scale: 2, mode: "number" }),
  priceMode: varchar("price_mode", { length: 24 }).notNull().default("hidden"),
  priceCents: integer("price_cents"),
  priceCurrency: char("price_currency", { length: 3 }),
  location: varchar("location", { length: 120 }),
  provenanceSummary: text("provenance_summary"),
  isFeatured: boolean("is_featured").notNull().default(false),
  isPublished: boolean("is_published").notNull().default(false),
  displayOrder: integer("display_order").notNull().default(0),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  index("putters_published_status_idx").on(table.isPublished, table.status),
  index("putters_featured_order_idx").on(table.isFeatured, table.displayOrder),
  index("putters_published_at_idx").on(table.publishedAt),
]);

export const putterTranslations = pgTable("putter_translations", {
  id: uuid("id").primaryKey().defaultRandom(),
  putterId: uuid("putter_id").notNull().references(() => putters.id, { onDelete: "cascade" }),
  locale: varchar("locale", { length: 12 }).notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  subtitle: varchar("subtitle", { length: 240 }),
  overview: text("overview"),
  collectorNotes: text("collector_notes"),
  conditionNotes: text("condition_notes"),
  provenanceText: text("provenance_text"),
  includedItems: text("included_items"),
  seoTitle: varchar("seo_title", { length: 180 }),
  seoDescription: varchar("seo_description", { length: 320 }),
}, (table) => [uniqueIndex("putter_translations_putter_locale_idx").on(table.putterId, table.locale)]);

export const putterImages = pgTable("putter_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  putterId: uuid("putter_id").notNull().references(() => putters.id, { onDelete: "cascade" }),
  src: varchar("src", { length: 600 }).notNull(),
  storageKey: varchar("storage_key", { length: 600 }),
  altZhHant: varchar("alt_zh_hant", { length: 300 }),
  altZhHans: varchar("alt_zh_hans", { length: 300 }),
  altEn: varchar("alt_en", { length: 300 }),
  width: integer("width"),
  height: integer("height"),
  sortOrder: integer("sort_order").notNull().default(0),
  isPrimary: boolean("is_primary").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [index("putter_images_putter_order_idx").on(table.putterId, table.sortOrder)]);

export const putterTags = pgTable("putter_tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
});

export const putterTagLinks = pgTable("putter_tag_links", {
  putterId: uuid("putter_id").notNull().references(() => putters.id, { onDelete: "cascade" }),
  tagId: uuid("tag_id").notNull().references(() => putterTags.id, { onDelete: "cascade" }),
}, (table) => [primaryKey({ columns: [table.putterId, table.tagId] })]);

export const inquiries = pgTable("inquiries", {
  id: uuid("id").primaryKey().defaultRandom(),
  putterId: uuid("putter_id").references(() => putters.id, { onDelete: "set null" }),
  locale: varchar("locale", { length: 12 }).notNull(),
  name: varchar("name", { length: 80 }).notNull(),
  contactMethod: varchar("contact_method", { length: 24 }).notNull(),
  contactValue: varchar("contact_value", { length: 150 }).notNull(),
  countryRegion: varchar("country_region", { length: 100 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 24 }).notNull().default("new"),
  internalNote: text("internal_note"),
  sourceUrl: varchar("source_url", { length: 500 }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [index("inquiries_status_created_idx").on(table.status, table.createdAt)]);

export const testimonials = pgTable("testimonials", {
  id: uuid("id").primaryKey().defaultRandom(),
  quote: text("quote").notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  location: varchar("location", { length: 120 }),
  locale: varchar("locale", { length: 12 }).notNull(),
  isPublished: boolean("is_published").notNull().default(false),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const siteSettings = pgTable("site_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  brandName: varchar("brand_name", { length: 120 }).notNull(),
  logoText: varchar("logo_text", { length: 80 }).notNull(),
  defaultLocale: varchar("default_locale", { length: 12 }).notNull().default("zh-hant"),
  announcementEnabled: boolean("announcement_enabled").notNull().default(true),
  announcementZhHant: text("announcement_zh_hant"),
  announcementZhHans: text("announcement_zh_hans"),
  announcementEn: text("announcement_en"),
  heroTitleZhHant: varchar("hero_title_zh_hant", { length: 180 }),
  heroTitleZhHans: varchar("hero_title_zh_hans", { length: 180 }),
  heroTitleEn: varchar("hero_title_en", { length: 180 }),
  heroSubtitleZhHant: text("hero_subtitle_zh_hant"),
  heroSubtitleZhHans: text("hero_subtitle_zh_hans"),
  heroSubtitleEn: text("hero_subtitle_en"),
  heroImageSrc: varchar("hero_image_src", { length: 600 }),
  ownerImageSrc: varchar("owner_image_src", { length: 600 }),
  contactEmail: varchar("contact_email", { length: 180 }),
  whatsappUrl: varchar("whatsapp_url", { length: 500 }),
  wechatId: varchar("wechat_id", { length: 120 }),
  wechatQrSrc: varchar("wechat_qr_src", { length: 600 }),
  instagramUrl: varchar("instagram_url", { length: 500 }),
  xiaohongshuUrl: varchar("xiaohongshu_url", { length: 500 }),
  location: varchar("location", { length: 120 }),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// Customer authentication is intentionally separate from the owner/admin login.
// These four tables follow the schema generated by Better Auth for Drizzle.
export const customerUser = pgTable("customer_user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
});

export const customerSession = pgTable("customer_session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().$onUpdate(() => new Date()),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => customerUser.id, { onDelete: "cascade" }),
}, (table) => [index("customerSession_userId_idx").on(table.userId)]);

export const customerAccount = pgTable("customer_account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => customerUser.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [index("customerAccount_userId_idx").on(table.userId)]);

export const customerVerification = pgTable("customer_verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [index("customerVerification_identifier_idx").on(table.identifier)]);

export const customerProfiles = pgTable("customer_profiles", {
  userId: text("user_id").primaryKey().references(() => customerUser.id, { onDelete: "cascade" }),
  preferredLocale: varchar("preferred_locale", { length: 12 }).notNull().default("en"),
  countryRegion: varchar("country_region", { length: 100 }),
  phone: varchar("phone", { length: 40 }),
  contactPreference: varchar("contact_preference", { length: 24 }).notNull().default("email"),
  marketingOptIn: boolean("marketing_opt_in").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const customerInterests = pgTable("customer_interests", {
  userId: text("user_id").notNull().references(() => customerUser.id, { onDelete: "cascade" }),
  putterId: uuid("putter_id").notNull().references(() => putters.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  primaryKey({ columns: [table.userId, table.putterId] }),
  index("customer_interests_user_created_idx").on(table.userId, table.createdAt),
]);

export type PutterRow = typeof putters.$inferSelect;
export type NewPutterRow = typeof putters.$inferInsert;
export type InquiryRow = typeof inquiries.$inferSelect;
export type CustomerProfileRow = typeof customerProfiles.$inferSelect;
