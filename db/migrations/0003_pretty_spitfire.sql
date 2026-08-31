CREATE TABLE "catalog_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(80) NOT NULL,
	"name_zh_hant" varchar(80) NOT NULL,
	"name_zh_hans" varchar(80) NOT NULL,
	"name_en" varchar(80) NOT NULL,
	"description_zh_hant" text DEFAULT '' NOT NULL,
	"description_zh_hans" text DEFAULT '' NOT NULL,
	"description_en" text DEFAULT '' NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "catalog_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "putters" ADD COLUMN "catalog_category_id" uuid;--> statement-breakpoint
CREATE INDEX "catalog_categories_active_order_idx" ON "catalog_categories" USING btree ("is_active","display_order");--> statement-breakpoint
ALTER TABLE "putters" ADD CONSTRAINT "putters_catalog_category_id_catalog_categories_id_fk" FOREIGN KEY ("catalog_category_id") REFERENCES "public"."catalog_categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "putters_catalog_category_idx" ON "putters" USING btree ("catalog_category_id");
--> statement-breakpoint
INSERT INTO "catalog_categories" ("id", "slug", "name_zh_hant", "name_zh_hans", "name_en", "description_zh_hant", "description_zh_hans", "description_en", "display_order", "is_default", "is_active") VALUES
  ('10000000-0000-4000-8000-000000000001', 'putters', '推桿', '推杆', 'Putters', '巡迴賽版本、限量作品與值得記錄的推桿。', '巡回赛版本、限量作品与值得记录的推杆。', 'Tour builds, limited releases, and putters worth documenting.', 0, true, true),
  ('10000000-0000-4000-8000-000000000002', 'headcovers', '桿套', '杆套', 'Headcovers', '原廠、巡迴賽及特別版本桿套。', '原厂、巡回赛及特别版本杆套。', 'Factory, tour, and special-edition headcovers.', 1, false, true),
  ('10000000-0000-4000-8000-000000000003', 'golf-bags', '球包', '球包', 'Golf Bags', '具收藏價值的球包與限量設計。', '具有收藏价值的球包与限量设计。', 'Collectible golf bags and limited designs.', 2, false, true),
  ('10000000-0000-4000-8000-000000000004', 'accessories', '配件', '配件', 'Accessories', '標記、工具及其他收藏配件。', '标记、工具及其他收藏配件。', 'Markers, tools, and other collectible accessories.', 3, false, true);
--> statement-breakpoint
UPDATE "putters" SET "catalog_category_id" = '10000000-0000-4000-8000-000000000001' WHERE "catalog_category_id" IS NULL;
