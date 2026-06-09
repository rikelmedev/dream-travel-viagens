import type { VercelRequest, VercelResponse } from '@vercel/node';
import { eq } from 'drizzle-orm';
import { db } from '../_lib/db.js';
import { vipCodes } from '../_lib/schema.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Metodo nao permitido' });

  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Codigo nao informado' });

  try {
    const [found] = await db
      .select()
      .from(vipCodes)
      .where(eq(vipCodes.code, code.toUpperCase()));

    if (!found) return res.status(401).json({ error: 'Codigo invalido' });
    if (!found.is_active) return res.status(403).json({ error: 'Este acesso foi desativado' });

    return res.json({
      valid: true,
      client_name: found.client_name,
      code: found.code,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao validar codigo' });
  }
}
