import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from './_lib/db';
import { destinations, insertDestinationSchema } from './_lib/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const rows = await db.select().from(destinations);
      return res.json(rows);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar destinos' });
    }
  }

  if (req.method === 'POST') {
    try {
      const parsed = insertDestinationSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
      const [created] = await db.insert(destinations).values(parsed.data).returning();
      return res.status(201).json(created);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao criar destino' });
    }
  }

  return res.status(405).json({ error: 'Metodo nao permitido' });
}
