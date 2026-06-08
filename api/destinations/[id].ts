import type { VercelRequest, VercelResponse } from '@vercel/node';
import { eq } from 'drizzle-orm';
import { db } from '../_lib/db.js';
import { destinations } from '../_lib/schema.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = parseInt(req.query.id as string, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

  if (req.method === 'DELETE') {
    try {
      await db.delete(destinations).where(eq(destinations.id, id));
      return res.status(204).send('');
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao remover destino' });
    }
  }

  return res.status(405).json({ error: 'Metodo nao permitido' });
}
