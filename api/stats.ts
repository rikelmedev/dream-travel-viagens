import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from './_lib/db';
import { destinations, posts, vipCodes } from './_lib/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Metodo nao permitido' });

  try {
    const [allDestinations, allPosts, allVipCodes] = await Promise.all([
      db.select().from(destinations),
      db.select().from(posts),
      db.select().from(vipCodes),
    ]);

    return res.json({
      destinations: allDestinations.length,
      postsPublished: allPosts.filter(p => p.status === 'published').length,
      postsDraft: allPosts.filter(p => p.status === 'draft').length,
      vipActive: allVipCodes.filter(v => v.is_active).length,
      vipTotal: allVipCodes.length,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar estatisticas' });
  }
}
