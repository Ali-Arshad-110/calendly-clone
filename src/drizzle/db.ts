import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

const databaseUrl = process.env.DATABASE_URL?.trim()

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is not defined. Set DATABASE_URL in your environment or .env file."
  )
}

const sql = neon(databaseUrl)
export const db = drizzle(sql, { schema })
