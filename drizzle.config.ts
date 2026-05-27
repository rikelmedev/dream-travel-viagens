import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./server/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres:Amoradoripandora@1@db.zcsmyqypwojcrhubqalf.supabase.co:5432/postgres",
  },
});