import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "./_lib/db.js";
import { destinations, posts, vipCodes, newsletterSubscribers } from "./_lib/schema.js";
import { requireAdmin } from "./_lib/auth.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Metodo nao permitido" });

  return requireAdmin(req, res, async () => {
    try {
      const [allDestinations, allPosts, allVipCodes, allNewsletter] = await Promise.all([
        db.select().from(destinations),
        db.select().from(posts),
        db.select().from(vipCodes),
        db.select().from(newsletterSubscribers),
      ]);

      res.json({
        destinations: allDestinations.length,
        postsPublished: allPosts.filter((p) => p.status === "published").length,
        postsDraft: allPosts.filter((p) => p.status === "draft").length,
        vipActive: allVipCodes.filter((v) => v.is_active).length,
        vipTotal: allVipCodes.length,
        newsletterCount: allNewsletter.length,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar estatisticas" });
    }
  });
}
