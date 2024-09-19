import { asc, between, count, eq, getTableColumns, sql } from "drizzle-orm";
import * as Schema from "../schema";

import {
  SelectUser,
  usersTable,
  SelectSkillSet,
  skillSetTable,
  SelectContact,
  contactTable,
  educationTable,
  SelectEducation,
  SelectCompany,
  SelectProject,
  projectTable,
  SelectCompanySkillUsed,
} from "../schema";
import { NeonHttpDatabase } from "drizzle-orm/neon-http";

export async function getUsers(
  db: NeonHttpDatabase<typeof Schema>
): Promise<Array<SelectUser>> {
  return db.selectDistinctOn([usersTable.name]).from(usersTable);
}
export async function getSkills(
  db: NeonHttpDatabase<typeof Schema>
): Promise<Array<SelectSkillSet>> {
  return db.select().from(skillSetTable);
}
export async function getContacts(
  db: NeonHttpDatabase<typeof Schema>
): Promise<Array<SelectContact>> {
  return db.select().from(contactTable);
}
export async function getEducations(
  db: NeonHttpDatabase<typeof Schema>
): Promise<Array<SelectEducation>> {
  return db.select().from(educationTable);
}
export type WorkHistory = SelectCompany & {
  projects: Array<SelectProject>;
  skills: Array<SelectCompanySkillUsed>;
};

export async function getCompany(
  db: NeonHttpDatabase<typeof Schema>
): Promise<WorkHistory[]> {
  return db.query.companyTable.findMany({
    with: {
      projects: true,
      skills: true,
    },
  });
}
export async function getProject(
  db: NeonHttpDatabase<typeof Schema>
): Promise<Array<SelectProject>> {
  return db.select().from(projectTable);
}

// export async function getUsersWithPostsCount(
//   page = 1,
//   pageSize = 5,
//   db: NeonHttpDatabase
// ): Promise<
//   Array<{
//     postsCount: number;
//     id: number;
//     name: string;
//     age: number;
//     email: string;
//   }>
// > {
//   return db
//     .select({
//       ...getTableColumns(usersTable),
//       postsCount: count(postsTable.id),
//     })
//     .from(usersTable)
//     .leftJoin(postsTable, eq(usersTable.id, postsTable.userId))
//     .groupBy(usersTable.id)
//     .orderBy(asc(usersTable.id))
//     .limit(pageSize)
//     .offset((page - 1) * pageSize);
// }

// export async function getPostsForLast24Hours(
//   page = 1,
//   pageSize = 5,
//   db: NeonHttpDatabase
// ): Promise<
//   Array<{
//     id: number;
//     title: string;
//   }>
// > {
//   return db
//     .select({
//       id: postsTable.id,
//       title: postsTable.title,
//     })
//     .from(postsTable)
//     .where(
//       between(postsTable.createdAt, sql`now() - interval '1 day'`, sql`now()`)
//     )
//     .orderBy(asc(postsTable.title), asc(postsTable.id))
//     .limit(pageSize)
//     .offset((page - 1) * pageSize);
// }
