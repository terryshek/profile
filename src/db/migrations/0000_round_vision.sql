CREATE TABLE IF NOT EXISTS "company_skill_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"skills" text[] NOT NULL,
	"companyId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"location" text NOT NULL,
	"industry" text NOT NULL,
	"from" date DEFAULT now() NOT NULL,
	"to" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contacts_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"icon" text NOT NULL,
	"navigation" text NOT NULL,
	"label" text NOT NULL,
	"userId" text NOT NULL,
	"location" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "education_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"from" text NOT NULL,
	"to" text NOT NULL,
	"result" text NOT NULL,
	"school" text NOT NULL,
	"field_of_study" text DEFAULT 'no countable',
	"current" boolean DEFAULT false,
	"description" text DEFAULT 'no content'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "experience_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"company" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"companyId" integer NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skill_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"tech" text NOT NULL,
	"skill" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"title" text NOT NULL,
	"avatar" text NOT NULL,
	"introduction" text NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "email" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_skill_table" ADD CONSTRAINT "company_skill_table_companyId_company_table_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."company_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_skill_table" ADD CONSTRAINT "skill_fk" FOREIGN KEY ("companyId") REFERENCES "public"."company_table"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contacts_table" ADD CONSTRAINT "contacts_table_userId_users_table_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "experience_table" ADD CONSTRAINT "experience_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_table" ADD CONSTRAINT "project_table_companyId_company_table_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."company_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_table" ADD CONSTRAINT "company_fk" FOREIGN KEY ("companyId") REFERENCES "public"."company_table"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
