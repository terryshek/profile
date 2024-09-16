import { eq } from "drizzle-orm";

import { SelectPost, postsTable } from "../schema";
import { NeonHttpDatabase } from "drizzle-orm/neon-http";
export async function updatePost(
  id: SelectPost["id"],
  data: Partial<Omit<SelectPost, "id">>,
  db: NeonHttpDatabase
) {
  await db.update(postsTable).set(data).where(eq(postsTable.id, id));
}
