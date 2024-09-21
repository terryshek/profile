CREATE TABLE IF NOT EXISTS "top_skill__table" (
	"id" serial PRIMARY KEY NOT NULL,
	"icon" text NOT NULL,
	"label" text NOT NULL,
	"userId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "education_table" ADD COLUMN "userId" integer DEFAULT 1;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "top_skill__table" ADD CONSTRAINT "top_skill__table_userId_users_table_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
