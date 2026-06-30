import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createHmac, timingSafeEqual } from "crypto";

const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

function createToken(secret: string) {
  const expiry = String(Date.now() + SESSION_DURATION_MS);
  return `${expiry}.${sign(expiry, secret)}`;
}

function verifyToken(token: string | undefined, secret: string): boolean {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return false;
  const expiry = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (Date.now() > Number(expiry)) return false;
  const expected = sign(expiry, secret);
  try {
    return timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = (req.url ?? "").replace(/\?.*$/, "");
  const secret = process.env.ADMIN_PASSWORD;

  // ── AUTH ──────────────────────────────────────────────────────────────────

  if (url.endsWith("/admin/login")) {
    if (req.method !== "POST") return res.status(405).json({ error: "Metodo nao permitido" });
    if (!secret) return res.status(500).json({ error: "Configuração incompleta" });
    const { password } = req.body ?? {};
    if (!password || password !== secret) return res.status(401).json({ error: "Senha incorreta" });
    return res.json({ token: createToken(secret) });
  }

  if (url.endsWith("/admin/verify")) {
    if (!secret) return res.status(500).json({ error: "Configuração incompleta" });
    const token = req.headers["x-admin-token"] as string | undefined;
    if (!verifyToken(token, secret)) return res.status(401).json({ error: "Não autorizado" });
    return res.json({ ok: true });
  }

  if (url.endsWith("/admin/logout")) {
    return res.json({ ok: true });
  }

  // ── GUARD ─────────────────────────────────────────────────────────────────

  function requireAdmin(): boolean {
    if (!secret) { res.status(500).json({ error: "Configuração incompleta" }); return false; }
    const token = req.headers["x-admin-token"] as string | undefined;
    if (!verifyToken(token, secret)) { res.status(401).json({ error: "Não autorizado" }); return false; }
    return true;
  }

  // ── DB (lazy import to isolate failures) ──────────────────────────────────

  const { db } = await import("../server/db.js");
  const {
    destinations, posts, vipCodes, itineraries, newsletterSubscribers,
  } = await import("../server/schema.js");
  const { eq } = await import("drizzle-orm");

  // ── DESTINATIONS ──────────────────────────────────────────────────────────

  if (url.match(/\/api\/destinations\/\d+$/)) {
    const id = parseInt(url.split("/").pop()!, 10);
    if (req.method === "GET") {
      const [dest] = await db.select().from(destinations).where(eq(destinations.id, id));
      return dest ? res.json(dest) : res.status(404).json({ error: "Não encontrado" });
    }
    if (req.method === "PUT") {
      if (!requireAdmin()) return;
      const [updated] = await db.update(destinations).set(req.body).where(eq(destinations.id, id)).returning();
      return res.json(updated);
    }
    if (req.method === "DELETE") {
      if (!requireAdmin()) return;
      await db.delete(destinations).where(eq(destinations.id, id));
      return res.status(204).send("");
    }
  }

  if (url.endsWith("/api/destinations")) {
    if (req.method === "GET") {
      const rows = await db.select().from(destinations);
      return res.json(rows);
    }
    if (req.method === "POST") {
      if (!requireAdmin()) return;
      const [created] = await db.insert(destinations).values(req.body).returning();
      return res.status(201).json(created);
    }
  }

  // ── POSTS ─────────────────────────────────────────────────────────────────

  if (url.match(/\/api\/posts\/\d+$/)) {
    const id = parseInt(url.split("/").pop()!, 10);
    if (req.method === "GET") {
      const [post] = await db.select().from(posts).where(eq(posts.id, id));
      return post ? res.json(post) : res.status(404).json({ error: "Não encontrado" });
    }
    if (req.method === "PUT") {
      if (!requireAdmin()) return;
      const [updated] = await db.update(posts).set(req.body).where(eq(posts.id, id)).returning();
      return res.json(updated);
    }
    if (req.method === "DELETE") {
      if (!requireAdmin()) return;
      await db.delete(posts).where(eq(posts.id, id));
      return res.status(204).send("");
    }
  }

  if (url.endsWith("/api/posts")) {
    if (req.method === "GET") {
      const rows = await db.select().from(posts).orderBy(posts.created_at);
      return res.json(rows);
    }
    if (req.method === "POST") {
      if (!requireAdmin()) return;
      const [created] = await db.insert(posts).values(req.body).returning();
      return res.status(201).json(created);
    }
  }

  // ── VIP CODES ─────────────────────────────────────────────────────────────

  if (url.endsWith("/api/vip-codes/validate")) {
    const { code } = req.body ?? {};
    if (!code) return res.status(400).json({ error: "Código obrigatório" });
    const [vip] = await db.select().from(vipCodes).where(eq(vipCodes.code, String(code).toUpperCase()));
    if (!vip) return res.status(401).json({ error: "Código não encontrado" });
    if (!vip.is_active) return res.status(403).json({ error: "Acesso desativado" });
    return res.json({ code: vip.code, client_name: vip.client_name });
  }

  if (url.match(/\/api\/vip-codes\/\d+\/toggle$/)) {
    if (!requireAdmin()) return;
    const id = parseInt(url.split("/").slice(-2)[0], 10);
    const [current] = await db.select().from(vipCodes).where(eq(vipCodes.id, id));
    if (!current) return res.status(404).json({ error: "Não encontrado" });
    const [updated] = await db.update(vipCodes).set({ is_active: !current.is_active }).where(eq(vipCodes.id, id)).returning();
    return res.json(updated);
  }

  if (url.match(/\/api\/vip-codes\/\d+$/)) {
    const id = parseInt(url.split("/").pop()!, 10);
    if (req.method === "DELETE") {
      if (!requireAdmin()) return;
      await db.delete(vipCodes).where(eq(vipCodes.id, id));
      return res.status(204).send("");
    }
  }

  if (url.endsWith("/api/vip-codes")) {
    if (req.method === "GET") {
      const rows = await db.select().from(vipCodes).orderBy(vipCodes.created_at);
      return res.json(rows);
    }
    if (req.method === "POST") {
      if (!requireAdmin()) return;
      const body = { ...req.body, code: String(req.body.code ?? "").toUpperCase() };
      const [created] = await db.insert(vipCodes).values(body).returning();
      return res.status(201).json(created);
    }
  }

  // ── ITINERARIES ───────────────────────────────────────────────────────────

  if (url.match(/\/api\/itineraries\/.+$/)) {
    const vip_code = url.split("/").pop()!.toUpperCase();
    if (req.method === "GET") {
      const [itin] = await db.select().from(itineraries).where(eq(itineraries.vip_code, vip_code));
      return itin ? res.json(itin) : res.status(404).json({ error: "Não encontrado" });
    }
    if (req.method === "PUT") {
      if (!requireAdmin()) return;
      const [updated] = await db.update(itineraries).set(req.body).where(eq(itineraries.vip_code, vip_code)).returning();
      return res.json(updated);
    }
    if (req.method === "DELETE") {
      if (!requireAdmin()) return;
      await db.delete(itineraries).where(eq(itineraries.vip_code, vip_code));
      return res.status(204).send("");
    }
  }

  if (url.endsWith("/api/itineraries")) {
    if (req.method === "GET") {
      const rows = await db.select().from(itineraries).orderBy(itineraries.created_at);
      return res.json(rows);
    }
    if (req.method === "POST") {
      if (!requireAdmin()) return;
      const [created] = await db.insert(itineraries).values(req.body).returning();
      return res.status(201).json(created);
    }
  }

  // ── NEWSLETTER ────────────────────────────────────────────────────────────

  if (url.endsWith("/api/newsletter")) {
    if (req.method === "POST") {
      const { email } = req.body ?? {};
      if (!email) return res.status(400).json({ error: "E-mail obrigatório" });
      try {
        await db.insert(newsletterSubscribers).values({ email: String(email).toLowerCase().trim() });
        return res.status(201).json({ ok: true });
      } catch (err: any) {
        if (err?.code === "23505") return res.status(409).json({ error: "E-mail já registado" });
        throw err;
      }
    }
    if (req.method === "GET") {
      if (!requireAdmin()) return;
      const rows = await db.select().from(newsletterSubscribers).orderBy(newsletterSubscribers.created_at);
      return res.json(rows);
    }
  }

  // ── STATS ─────────────────────────────────────────────────────────────────

  if (url.endsWith("/api/stats")) {
    if (!requireAdmin()) return;
    const [allDest, allPosts, allVip, allNews] = await Promise.all([
      db.select().from(destinations),
      db.select().from(posts),
      db.select().from(vipCodes),
      db.select().from(newsletterSubscribers),
    ]);
    return res.json({
      destinations: allDest.length,
      postsPublished: allPosts.filter((p) => p.status === "published").length,
      postsDraft: allPosts.filter((p) => p.status === "draft").length,
      vipActive: allVip.filter((v) => v.is_active).length,
      vipTotal: allVip.length,
      newsletterCount: allNews.length,
    });
  }

  return res.status(404).json({ error: "Rota não encontrada" });
}
