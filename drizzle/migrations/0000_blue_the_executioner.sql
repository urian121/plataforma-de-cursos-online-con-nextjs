CREATE TABLE "courses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"subtitle" text,
	"description" text,
	"cover_image_url" text,
	"trailer_video_url" text,
	"level" varchar(50) DEFAULT 'beginner',
	"category" varchar(100),
	"tags" text[],
	"price" varchar(50) DEFAULT '0.00',
	"is_published" boolean DEFAULT false,
	"total_duration_minutes" integer DEFAULT 0,
	"total_lessons" integer DEFAULT 0,
	"created_by" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"published_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "lessons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"section_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"video_id" varchar(255) NOT NULL,
	"video_provider" varchar(50) DEFAULT 'youtube',
	"thumbnail_url" text,
	"duration_seconds" integer,
	"order_index" integer NOT NULL,
	"is_preview" boolean DEFAULT false,
	"resources_url" text,
	"transcript" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"course_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"order_index" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"avatar_url" text,
	"role" varchar(50) DEFAULT 'student',
	"is_active" boolean DEFAULT true,
	"email_verified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
