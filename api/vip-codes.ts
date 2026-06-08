import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from './_lib/db.js';
import { vipCodes, insertVipCodeSchema } from './_lib/schema.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const rows = await db.select().from(vipCodes).orderBy(vipCodes.created_at);
      return res.json(rows);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar codigos VIP' });
    }
  }

  if (req.method === 'POST') {
    try {
      const parsed = insertVipCodeSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
      const [created] = await db.insert(vipCodes).values(parsed.data).returning();
      return res.status(201).json(created);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao criar codigo VIP' });
    }
  }

  return res.status(405).json({ error: 'Metodo nao permitido' });
}
