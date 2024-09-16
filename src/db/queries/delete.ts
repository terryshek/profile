import { eq } from "drizzle-orm";
import { SelectUser, usersTable } from "../schema";
import { NeonHttpDatabase } from "drizzle-orm/neon-http";

export async function deleteUser(id: SelectUser["id"], db: NeonHttpDatabase) {
  await db.delete(usersTable).where(eq(usersTable.id, id));
}
