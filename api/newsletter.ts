import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "./_lib/db.js";
import { newsletterSubscribers } from "./_lib/schema.js";
import { requireAdmin } from "./_lib/auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    const { email } = req.body ?? {};
    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "E-mail obrigatório" });
    }
    try {
      await db.insert(newsletterSubscribers).values({ email: email.toLowerCase().trim() });
      return res.status(201).json({ ok: true });
    } catch (err: any) {
      if (err?.code === "23505") return res.status(409).json({ error: "E-mail já registado" });
      console.error(err);
      return res.status(500).json({ error: "Erro ao registar e-mail" });
    }
  }

  if (req.method === "GET") {
    return requireAdmin(req, res, async () => {
      try {
        const rows = await db
          .select()
          .from(newsletterSubscribers)
          .orderBy(newsletterSubscribers.created_at);
        res.json(rows);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao buscar assinantes" });
      }
    });
  }

  return res.status(405).json({ error: "Metodo nao permitido" });
}
