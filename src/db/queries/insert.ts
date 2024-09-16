import {
  contactMethodTable,
  InsertContactMethod,
  InsertPost,
  InsertSkillSet,
  InsertUser,
  postsTable,
  skillSetTable,
  usersTable,
} from "../schema";
import { NeonHttpDatabase } from "drizzle-orm/neon-http";
export async function createUser(data: InsertUser, db: NeonHttpDatabase) {
  await db.insert(usersTable).values(data).returning();
}
export async function createPost(data: InsertPost, db: NeonHttpDatabase) {
  await db.insert(postsTable).values(data).returning();
}
export async function createSkill(
  data: InsertSkillSet[],
  db: NeonHttpDatabase
) {
  await db.insert(skillSetTable).values(data).returning();
}

export async function createContact(
  data: InsertContactMethod[],
  db: NeonHttpDatabase
) {
  await db.insert(contactMethodTable).values(data).returning();
}
