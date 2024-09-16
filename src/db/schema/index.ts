import e from "cors";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
export const tech_area_enum = text("tech", {
  enum: ["frontend", "backend", "devops"],
});

export const usersTable = pgTable("users_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  email: text("email").notNull().unique(),
});

export const postsTable = pgTable("posts_table", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const skillSetTable = pgTable("skill_table", {
  id: serial("id").primaryKey(),
  area: tech_area_enum.notNull(),
  skill: text("skill").notNull(),
});

export const contactMethodTable = pgTable("contact_table", {
  id: serial("id").primaryKey(),
  icon: text("icon").notNull(),
  navigation: text("navigation").notNull(),
  label: text("label").notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;

export type InsertSkillSet = typeof skillSetTable.$inferInsert;
export type SelectSkillSet = typeof skillSetTable.$inferSelect;

export type InsertContactMethod = typeof contactMethodTable.$inferInsert;
export type SelectContactMethod = typeof contactMethodTable.$inferSelect;
