import type { VercelRequest, VercelResponse } from '@vercel/node';
import { eq } from 'drizzle-orm';
import { db } from '../_lib/db.js';
import { posts } from '../_lib/schema.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = parseInt(req.query.id as string, 10);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

  if (req.method === 'GET') {
    try {
      const [post] = await db.select().from(posts).where(eq(posts.id, id));
      if (!post) return res.status(404).json({ error: 'Post nao encontrado' });
      return res.json(post);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar post' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const [updated] = await db.update(posts).set(req.body).where(eq(posts.id, id)).returning();
      return res.json(updated);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao atualizar post' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await db.delete(posts).where(eq(posts.id, id));
      return res.status(204).send('');
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao remover post' });
    }
  }

  return res.status(405).json({ error: 'Metodo nao permitido' });
}
