import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

export function db(url: string) {
  const sql = neon(url);
  return drizzle(sql);
}
