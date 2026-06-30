import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createToken } from "../_lib/auth.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Metodo nao permitido" });

  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return res.status(500).json({ error: "Configuração incompleta" });

  const { password } = req.body ?? {};
  if (!password || password !== secret) {
    return res.status(401).json({ error: "Senha incorreta" });
  }

  const token = createToken(secret);
  return res.json({ token });
}
