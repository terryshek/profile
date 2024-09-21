import {
  companyTable,
  contactTable,
  educationTable,
  InsertCompany,
  InsertContact,
  InsertEducation,
  InsertProject,
  InsertSkillSet,
  InsertTopSkill,
  InsertUser,
  projectTable,
  skillSetTable,
  topSkillTable,
  usersTable,
} from "../schema";
import * as Schema from "../schema";
import { NeonHttpDatabase } from "drizzle-orm/neon-http";
export async function createUser(data: InsertUser, db: NeonHttpDatabase) {
  await db
    .insert(usersTable)
    .values(data)
    .onConflictDoNothing({ target: usersTable.id });
}
export async function createSkill(
  data: InsertSkillSet[],
  db: NeonHttpDatabase
) {
  await db
    .insert(skillSetTable)
    .values(data)
    .onConflictDoNothing({ target: skillSetTable.id });
}
export async function createCompany(
  data: InsertCompany[],
  db: NeonHttpDatabase
) {
  await db
    .insert(companyTable)
    .values(data)
    .onConflictDoNothing({ target: companyTable.id });
}

export async function createContact(
  data: InsertContact[],
  db: NeonHttpDatabase<typeof Schema>
) {
  await db
    .insert(contactTable)
    .values(data)
    .onConflictDoNothing({ target: contactTable.id });
}
export async function createEducation(
  data: InsertEducation[],
  db: NeonHttpDatabase
) {
  await db
    .insert(educationTable)
    .values(data)
    .onConflictDoNothing({ target: educationTable.id });
}
export async function createProject(
  data: InsertProject[],
  db: NeonHttpDatabase
) {
  await db
    .insert(projectTable)
    .values(data)
    .onConflictDoNothing({ target: projectTable.id });
}
export async function createTopSkill(
  data: InsertTopSkill[],
  db: NeonHttpDatabase<typeof Schema>
) {
  await db
    .insert(topSkillTable)
    .values(data)
    .onConflictDoNothing({ target: topSkillTable.id });
}
