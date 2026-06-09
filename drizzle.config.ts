import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./server/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres.zcsmyqypwojcrhubqalf:Amoradoripandora@aws-1-sa-east-1.pooler.supabase.com:5432/postgres",
  },
});