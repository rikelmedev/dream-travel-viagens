import type { VercelRequest, VercelResponse } from "@vercel/node";
import { verifyToken } from "../_lib/auth.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Metodo nao permitido" });

  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return res.status(500).json({ error: "Configuração incompleta" });

  const token = req.headers["x-admin-token"] as string | undefined;
  if (!verifyToken(token, secret)) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  return res.json({ ok: true });
}
