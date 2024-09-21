import {
  boolean,
  foreignKey,
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  date,
  json,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import SkillSet from "@/page/Skills";
import { s } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import test from "node:test";

export const tech_area_enum = text("tech", {
  enum: ["frontend", "backend", "devops"],
});

export const usersTable = pgTable("users_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  avatar: text("avatar").notNull(),
  introduction: text("introduction").notNull(),
  email: text("email").notNull().unique("email", { nulls: "distinct" }),
});

export const userRelations = relations(usersTable, ({ many }) => ({
  contact: many(contactTable),
  skills: many(topSkillTable),
  education: many(educationTable),
  profession: many(professionCertTable),
}));

export const topSkillTable = pgTable("top_skill__table", {
  id: serial("id").primaryKey(),
  icon: text("icon").notNull(),
  label: text("label").notNull(),
  userId: integer("userId")
    .notNull()
    .default(1)
    .references(() => usersTable.id, { onDelete: "cascade" }),
});
export const topSkillRelations = relations(topSkillTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [topSkillTable.userId],
    references: [usersTable.id],
    relationName: "user",
  }),
}));

export const contactTable = pgTable("contacts_table", {
  id: serial("id").primaryKey(),
  icon: text("icon").notNull(),
  navigation: text("navigation").notNull(),
  label: text("label").notNull(),
  userId: integer("userId")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  location: text("location").notNull(), // location of the contact method
});

export const contactRelations = relations(contactTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [contactTable.userId],
    references: [usersTable.id],
    relationName: "user",
  }),
}));

export const companyExpTable = pgTable("company_exp_table", {
  id: serial("id").primaryKey(),
  companyId: integer("companyId")
    .notNull()
    .references(() => companyTable.id, { onDelete: "cascade" }),
  experience: text("experience").notNull(),
});

export const companyExpRelations = relations(companyExpTable, ({ one }) => ({
  experience: one(companyTable, {
    fields: [companyExpTable.companyId],
    references: [companyTable.id],
    relationName: "company",
  }),
}));

export const companyTable = pgTable("company_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location", { enum: ["hk"] }).notNull(),
  industry: text("industry").notNull(),
  from: date("from").notNull().defaultNow(),
  to: date("to").notNull().defaultNow(),
});

export const companyRelations = relations(companyTable, ({ one, many }) => ({
  projects: many(projectTable, { relationName: "company" }),
  skills: many(companySkillUsedTable, { relationName: "skill" }),
  experience: one(companyExpTable),
}));

export const projectTable = pgTable(
  "project_table",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    companyId: integer("companyId")
      .notNull()
      .references(() => companyTable.id, { onDelete: "cascade" }),
    description: text("description").notNull(),
  },
  (table) => ({
    fk: foreignKey({
      name: "company_fk",
      columns: [table.companyId],
      foreignColumns: [companyTable.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  })
);

export const companySkillUsedTable = pgTable(
  "company_skill_table",
  {
    id: serial("id").primaryKey(),
    skill: text("skills").array().notNull(),
    companyId: integer("companyId")
      .notNull()
      .references(() => companyTable.id, { onDelete: "cascade" }),
  },
  (table) => ({
    fk: foreignKey({
      name: "skill_fk",
      columns: [table.companyId],
      foreignColumns: [companyTable.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  })
);

export const projectRelations = relations(projectTable, ({ one }) => ({
  company: one(companyTable, {
    fields: [projectTable.companyId],
    references: [companyTable.id],
    relationName: "company",
  }),
}));
export const companySkillUsedRelations = relations(
  companySkillUsedTable,
  ({ one }) => ({
    company: one(companyTable, {
      fields: [companySkillUsedTable.companyId],
      references: [companyTable.id],
      relationName: "skill",
    }),
  })
);

export const experienceTable = pgTable("experience_table", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  userId: text("user_id")
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

export const accessRightTable = pgTable("access_right_table", {
  id: serial("id").primaryKey(),
  role: text("role", { enum: ["owner", "visitor"] }).default("visitor"),
  password: text("password").notNull(),
  userName: text("userName").notNull(),
});

export const educationTable = pgTable("education_table", {
  id: serial("id").primaryKey(),
  from: text("from").notNull(),
  to: text("to").notNull(),
  result: text("result").notNull(),
  school: text("school").notNull(),
  fieldOfStudy: text("field_of_study").default("non countable"),
  current: boolean("current").default(false),
  description: text("description").default("no content"),
  userId: integer("userId")
    .notNull()
    .default(1)
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export const educationRelations = relations(educationTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [educationTable.userId],
    references: [usersTable.id],
    relationName: "user",
  }),
}));

export const professionCertTable = pgTable("profession_table", {
  id: serial("id").primaryKey(),
  from: text("from").notNull(),
  to: text("to").notNull(),
  result: text("result").notNull(),
  school: text("school").notNull(),
  fieldOfStudy: text("field_of_study").default("non countable"),
  current: boolean("current").default(false),
  description: text("description").default("no content"),
  userId: integer("userId")
    .notNull()
    .default(1)
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export const professionRelations = relations(
  professionCertTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [professionCertTable.userId],
      references: [usersTable.id],
      relationName: "user",
    }),
  })
);

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertSkillSet = typeof skillSetTable.$inferInsert;
export type SelectSkillSet = typeof skillSetTable.$inferSelect;

export type InsertContact = typeof contactTable.$inferInsert;
export type SelectContact = typeof contactTable.$inferSelect;

export type InsertEducation = typeof educationTable.$inferInsert;
export type SelectEducation = typeof educationTable.$inferSelect;

export type InsertProfession = typeof professionCertTable.$inferInsert;
export type SelectProfession = typeof professionCertTable.$inferSelect;

export type InsertExperience = typeof experienceTable.$inferInsert;
export type SelectExperience = typeof experienceTable.$inferSelect;

export type InsertCompany = typeof companyTable.$inferInsert;
export type SelectCompany = typeof companyTable.$inferSelect;

export type InsertProject = typeof projectTable.$inferInsert;
export type SelectProject = typeof projectTable.$inferSelect;

export type InsertCompanySkillUsed = typeof companySkillUsedTable.$inferInsert;
export type SelectCompanySkillUsed = typeof companySkillUsedTable.$inferSelect;

export type InsertTopSkill = typeof topSkillTable.$inferInsert;
export type SelectTopSkill = typeof topSkillTable.$inferSelect;

export type SelectAccessRight = typeof accessRightTable.$inferSelect;
