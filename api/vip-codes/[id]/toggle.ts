import type { VercelRequest, VercelResponse } from '@vercel/node';
import { eq } from 'drizzle-orm';
import { db } from '../../_lib/db.js';
import { vipCodes } from '../../_lib/schema.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PATCH') return res.status(405).json({ error: 'Metodo nao permitido' });

  const id = parseInt(req.query.id as string, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

  try {
    const [current] = await db.select().from(vipCodes).where(eq(vipCodes.id, id));
    if (!current) return res.status(404).json({ error: 'Codigo nao encontrado' });
    const [updated] = await db.update(vipCodes)
      .set({ is_active: !current.is_active })
      .where(eq(vipCodes.id, id))
      .returning();
    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao atualizar codigo VIP' });
  }
}
