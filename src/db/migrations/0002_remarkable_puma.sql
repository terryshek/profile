CREATE TABLE IF NOT EXISTS "company_exp_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"companyId" integer NOT NULL,
	"experience" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_exp_table" ADD CONSTRAINT "company_exp_table_companyId_company_table_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."company_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
