import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  strict: true,
  verbose: process.env.NODE_ENV === "development",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
})
