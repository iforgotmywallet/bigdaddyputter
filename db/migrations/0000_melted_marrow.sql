CREATE TABLE "inquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"putter_id" uuid,
	"locale" varchar(12) NOT NULL,
	"name" varchar(80) NOT NULL,
	"contact_method" varchar(24) NOT NULL,
	"contact_value" varchar(150) NOT NULL,
	"country_region" varchar(100),
	"message" text NOT NULL,
	"status" varchar(24) DEFAULT 'new' NOT NULL,
	"internal_note" text,
	"source_url" varchar(500),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "putter_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"putter_id" uuid NOT NULL,
	"src" varchar(600) NOT NULL,
	"alt_zh_hant" varchar(300),
	"alt_zh_hans" varchar(300),
	"alt_en" varchar(300),
	"width" integer,
	"height" integer,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_primary" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "putter_tag_links" (
	"putter_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	CONSTRAINT "putter_tag_links_putter_id_tag_id_pk" PRIMARY KEY("putter_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "putter_tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	CONSTRAINT "putter_tags_name_unique" UNIQUE("name"),
	CONSTRAINT "putter_tags_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "putter_translations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"putter_id" uuid NOT NULL,
	"locale" varchar(12) NOT NULL,
	"title" varchar(180) NOT NULL,
	"subtitle" varchar(240),
	"overview" text,
	"collector_notes" text,
	"condition_notes" text,
	"provenance_text" text,
	"included_items" text,
	"seo_title" varchar(180),
	"seo_description" varchar(320)
);
--> statement-breakpoint
CREATE TABLE "putters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(120) NOT NULL,
	"brand" varchar(100) NOT NULL,
	"model" varchar(120) NOT NULL,
	"model_family" varchar(120),
	"release_year" integer,
	"category" varchar(120),
	"status" varchar(24) NOT NULL,
	"head_style" varchar(120),
	"head_material" varchar(120),
	"finish" varchar(120),
	"neck_type" varchar(120),
	"alignment_aid" varchar(160),
	"length_inches" numeric(5, 2),
	"loft_degrees" numeric(4, 2),
	"lie_degrees" numeric(5, 2),
	"head_weight_grams" integer,
	"shaft" varchar(160),
	"grip" varchar(160),
	"headcover" varchar(160),
	"paint_fill" varchar(160),
	"coa_status" varchar(80),
	"serial_number" varchar(160),
	"condition_score" numeric(4, 2),
	"price_mode" varchar(24) DEFAULT 'hidden' NOT NULL,
	"price_cents" integer,
	"price_currency" char(3),
	"location" varchar(120),
	"provenance_summary" text,
	"is_featured" boolean DEFAULT false NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "putters_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"brand_name" varchar(120) NOT NULL,
	"logo_text" varchar(80) NOT NULL,
	"default_locale" varchar(12) DEFAULT 'zh-hant' NOT NULL,
	"announcement_enabled" boolean DEFAULT true NOT NULL,
	"announcement_zh_hant" text,
	"announcement_zh_hans" text,
	"announcement_en" text,
	"hero_title_zh_hant" varchar(180),
	"hero_title_zh_hans" varchar(180),
	"hero_title_en" varchar(180),
	"hero_subtitle_zh_hant" text,
	"hero_subtitle_zh_hans" text,
	"hero_subtitle_en" text,
	"hero_image_src" varchar(600),
	"owner_image_src" varchar(600),
	"contact_email" varchar(180),
	"whatsapp_url" varchar(500),
	"wechat_id" varchar(120),
	"wechat_qr_src" varchar(600),
	"instagram_url" varchar(500),
	"xiaohongshu_url" varchar(500),
	"location" varchar(120),
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"quote" text NOT NULL,
	"name" varchar(100) NOT NULL,
	"location" varchar(120),
	"locale" varchar(12) NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_putter_id_putters_id_fk" FOREIGN KEY ("putter_id") REFERENCES "public"."putters"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "putter_images" ADD CONSTRAINT "putter_images_putter_id_putters_id_fk" FOREIGN KEY ("putter_id") REFERENCES "public"."putters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "putter_tag_links" ADD CONSTRAINT "putter_tag_links_putter_id_putters_id_fk" FOREIGN KEY ("putter_id") REFERENCES "public"."putters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "putter_tag_links" ADD CONSTRAINT "putter_tag_links_tag_id_putter_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."putter_tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "putter_translations" ADD CONSTRAINT "putter_translations_putter_id_putters_id_fk" FOREIGN KEY ("putter_id") REFERENCES "public"."putters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "inquiries_status_created_idx" ON "inquiries" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX "putter_images_putter_order_idx" ON "putter_images" USING btree ("putter_id","sort_order");--> statement-breakpoint
CREATE UNIQUE INDEX "putter_translations_putter_locale_idx" ON "putter_translations" USING btree ("putter_id","locale");--> statement-breakpoint
CREATE INDEX "putters_published_status_idx" ON "putters" USING btree ("is_published","status");--> statement-breakpoint
CREATE INDEX "putters_featured_order_idx" ON "putters" USING btree ("is_featured","display_order");--> statement-breakpoint
CREATE INDEX "putters_published_at_idx" ON "putters" USING btree ("published_at");