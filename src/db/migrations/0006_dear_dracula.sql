CREATE TABLE IF NOT EXISTS "profession_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"from" text NOT NULL,
	"to" text NOT NULL,
	"result" text NOT NULL,
	"school" text NOT NULL,
	"field_of_study" text DEFAULT 'non countable',
	"current" boolean DEFAULT false,
	"description" text DEFAULT 'no content',
	"userId" integer DEFAULT 1
);
--> statement-breakpoint
ALTER TABLE "education_table" ALTER COLUMN "field_of_study" SET DEFAULT 'non countable';