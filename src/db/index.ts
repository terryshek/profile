import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

export function db(url: string) {
  const sql = neon(url);
  return drizzle(sql, { schema });
}
