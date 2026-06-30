import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  // Tokens são stateless — logout é apenas client-side (remover do localStorage)
  return res.json({ ok: true });
}
