import { asc, between, count, eq, getTableColumns, sql } from "drizzle-orm";
import {
  SelectUser,
  usersTable,
  postsTable,
  SelectSkillSet,
  skillSetTable,
  SelectContactMethod,
  contactMethodTable,
} from "../schema";
import { NeonHttpDatabase } from "drizzle-orm/neon-http";

export async function getUsers(
  db: NeonHttpDatabase
): Promise<Array<SelectUser>> {
  return db.select().from(usersTable);
}
export async function getSkills(
  db: NeonHttpDatabase
): Promise<Array<SelectSkillSet>> {
  return db.select().from(skillSetTable);
}
export async function getContacts(
  db: NeonHttpDatabase
): Promise<Array<SelectContactMethod>> {
  return db.select().from(contactMethodTable);
}

export async function getUsersWithPostsCount(
  page = 1,
  pageSize = 5,
  db: NeonHttpDatabase
): Promise<
  Array<{
    postsCount: number;
    id: number;
    name: string;
    age: number;
    email: string;
  }>
> {
  return db
    .select({
      ...getTableColumns(usersTable),
      postsCount: count(postsTable.id),
    })
    .from(usersTable)
    .leftJoin(postsTable, eq(usersTable.id, postsTable.userId))
    .groupBy(usersTable.id)
    .orderBy(asc(usersTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function getPostsForLast24Hours(
  page = 1,
  pageSize = 5,
  db: NeonHttpDatabase
): Promise<
  Array<{
    id: number;
    title: string;
  }>
> {
  return db
    .select({
      id: postsTable.id,
      title: postsTable.title,
    })
    .from(postsTable)
    .where(
      between(postsTable.createdAt, sql`now() - interval '1 day'`, sql`now()`)
    )
    .orderBy(asc(postsTable.title), asc(postsTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}
