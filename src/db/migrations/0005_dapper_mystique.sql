CREATE TABLE IF NOT EXISTS "access_right_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" text DEFAULT 'visitor',
	"password" text NOT NULL,
	"userName" text NOT NULL
);
