import type { VercelRequest, VercelResponse } from '@vercel/node';
import { eq } from 'drizzle-orm';
import { db } from '../_lib/db.js';
import { itineraries } from '../_lib/schema.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const vip_code = (req.query.vip_code as string || '').toUpperCase();
  if (!vip_code) return res.status(400).json({ error: 'Codigo VIP nao informado' });

  if (req.method === 'GET') {
    try {
      const [found] = await db.select().from(itineraries).where(eq(itineraries.vip_code, vip_code));
      if (!found) return res.status(404).json({ error: 'Roteiro nao encontrado' });
      return res.json(found);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar roteiro' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const body = req.body;
      const [updated] = await db
        .update(itineraries)
        .set({
          destination: body.destination,
          image_url: body.image_url ?? null,
          start_date: body.start_date ?? null,
          flight_detail: body.flight_detail ?? null,
          flight_sub: body.flight_sub ?? null,
          hotel_detail: body.hotel_detail ?? null,
          hotel_sub: body.hotel_sub ?? null,
          transfer_detail: body.transfer_detail ?? null,
          transfer_sub: body.transfer_sub ?? null,
          days: body.days ?? [],
        })
        .where(eq(itineraries.vip_code, vip_code))
        .returning();
      if (!updated) return res.status(404).json({ error: 'Roteiro nao encontrado' });
      return res.json(updated);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao atualizar roteiro' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await db.delete(itineraries).where(eq(itineraries.vip_code, vip_code));
      return res.status(204).send('');
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao remover roteiro' });
    }
  }

  return res.status(405).json({ error: 'Metodo nao permitido' });
}
