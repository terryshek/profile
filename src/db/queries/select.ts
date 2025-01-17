import { and, desc, eq } from "drizzle-orm";
import * as Schema from "../schema";

import {
  SelectUser,
  SelectContact,
  SelectEducation,
  SelectCompany,
  SelectProject,
  SelectCompanySkillUsed,
  SelectTopSkill,
  SelectAccessRight,
  accessRightTable,
  companyTable,
  SelectProfession,
} from "../schema";
import { NeonHttpDatabase } from "drizzle-orm/neon-http";

export type UserInfo = SelectUser & {
  contact: SelectContact[] | null;
  skills: SelectTopSkill[] | null;
  education: SelectEducation[] | null;
  profession: SelectProfession[] | null;
};
export async function getAccessRight(
  userName: string,
  password: string,
  db: NeonHttpDatabase<typeof Schema>
): Promise<SelectAccessRight[]> {
  return db.query.accessRightTable.findMany({
    where: and(
      eq(accessRightTable.userName, userName),
      eq(accessRightTable.password, password)
    ),
  });
}
export async function getUsers(
  name: string,
  db: NeonHttpDatabase<typeof Schema>
): Promise<UserInfo[]> {
  return db.query.usersTable.findMany({
    where: eq(Schema.usersTable.name, name),
    with: {
      contact: true,
      skills: true,
      education: true,
      profession: {
        orderBy: (profession, { asc }) => [asc(profession.id)],
      },
    },
  });
}
export type WorkHistory = SelectCompany & {
  projects: Array<SelectProject>;
  skills: Array<SelectCompanySkillUsed>;
  experience: { id: number; companyId: number; experience: string } | null;
};

export async function getCompany(
  db: NeonHttpDatabase<typeof Schema>
): Promise<WorkHistory[]> {
  return db.query.companyTable.findMany({
    with: {
      projects: {
        orderBy: (project, { asc }) => [asc(project.id)],
      },
      skills: true,
      experience: true,
    },
    orderBy: desc(companyTable.to),
  });
}
