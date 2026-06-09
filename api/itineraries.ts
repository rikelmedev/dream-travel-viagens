import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from './_lib/db.js';
import { itineraries } from './_lib/schema.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const all = await db.select().from(itineraries).orderBy(itineraries.created_at);
      return res.json(all);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao listar roteiros' });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = req.body;
      const [created] = await db.insert(itineraries).values({
        vip_code: (body.vip_code || '').toUpperCase(),
        destination: body.destination,
        image_url: body.image_url || null,
        start_date: body.start_date || null,
        flight_detail: body.flight_detail || null,
        flight_sub: body.flight_sub || null,
        hotel_detail: body.hotel_detail || null,
        hotel_sub: body.hotel_sub || null,
        transfer_detail: body.transfer_detail || null,
        transfer_sub: body.transfer_sub || null,
        days: body.days || [],
      }).returning();
      return res.status(201).json(created);
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes('unique')) return res.status(409).json({ error: 'Ja existe um roteiro para este codigo VIP' });
      return res.status(500).json({ error: 'Erro ao criar roteiro' });
    }
  }

  return res.status(405).json({ error: 'Metodo nao permitido' });
}
