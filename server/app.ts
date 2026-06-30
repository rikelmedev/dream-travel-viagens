import express from "express";
import { randomBytes } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "./db";
import {
  destinations, insertDestinationSchema,
  posts, insertPostSchema,
  vipCodes, insertVipCodeSchema,
  itineraries, insertItinerarySchema,
  newsletterSubscribers,
} from "./schema";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_PASSWORD) throw new Error('ADMIN_PASSWORD não definida no .env');

const adminSessions = new Map<string, number>();

setInterval(() => {
  const now = Date.now();
  for (const [token, expiry] of adminSessions) {
    if (now > expiry) adminSessions.delete(token);
  }
}, 60 * 60 * 1000);

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.headers['x-admin-token'] as string;
  const expiry = token ? adminSessions.get(token) : undefined;
  if (!token || !expiry || Date.now() > expiry) {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  next();
}

const app = express();
app.use(express.json());

// ── ADMIN AUTH ──────────────────────────────────────────────────────────────

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Senha incorreta' });
  }
  const token = randomBytes(32).toString('hex');
  adminSessions.set(token, Date.now() + 24 * 60 * 60 * 1000);
  res.json({ token });
});

app.get('/api/admin/verify', (req, res) => {
  const token = req.headers['x-admin-token'] as string;
  const expiry = token ? adminSessions.get(token) : undefined;
  if (!token || !expiry || Date.now() > expiry) {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  res.json({ ok: true });
});

app.post('/api/admin/logout', (req, res) => {
  const token = req.headers['x-admin-token'] as string;
  if (token) adminSessions.delete(token);
  res.json({ ok: true });
});

// ── DESTINATIONS ────────────────────────────────────────────────────────────

app.get("/api/destinations", async (_req, res) => {
  try {
    const rows = await db.select().from(destinations);
    res.json(rows);
  } catch (err) { console.error(err); res.status(500).json({ error: "Erro ao buscar destinos" }); }
});

app.post("/api/destinations", requireAdmin, async (req, res) => {
  try {
    const parsed = insertDestinationSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    const [created] = await db.insert(destinations).values(parsed.data).returning();
    res.status(201).json(created);
  } catch (err) { console.error(err); res.status(500).json({ error: "Erro ao criar destino" }); }
});

app.get("/api/destinations/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
    const [dest] = await db.select().from(destinations).where(eq(destinations.id, id));
    if (!dest) return res.status(404).json({ error: "Destino não encontrado" });
    res.json(dest);
  } catch (err) { console.error(err); res.status(500).json({ error: "Erro ao buscar destino" }); }
});

app.put("/api/destinations/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
    const [updated] = await db.update(destinations)
      .set({ ...req.body, rating: req.body.rating ? Number(req.body.rating) : undefined })
      .where(eq(destinations.id, id)).returning();
    if (!updated) return res.status(404).json({ error: "Destino não encontrado" });
    res.json(updated);
  } catch (err) { console.error(err); res.status(500).json({ error: "Erro ao atualizar destino" }); }
});

app.delete("/api/destinations/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
    await db.delete(destinations).where(eq(destinations.id, id));
    res.status(204).send();
  } catch (err) { console.error(err); res.status(500).json({ error: "Erro ao remover destino" }); }
});

// ── POSTS ───────────────────────────────────────────────────────────────────

app.get("/api/posts", async (_req, res) => {
  try {
    const rows = await db.select().from(posts).orderBy(posts.created_at);
    res.json(rows);
  } catch (err) { console.error(err); res.status(500).json({ error: "Erro ao buscar posts" }); }
});

app.get("/api/posts/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    if (!post) return res.status(404).json({ error: "Post não encontrado" });
    res.json(post);
  } catch (err) { console.error(err); res.status(500).json({ error: "Erro ao buscar post" }); }
});

app.post("/api/posts", requireAdmin, async (req, res) => {
  try {
    const parsed = insertPostSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    const [created] = await db.insert(posts).values(parsed.data).returning();
    res.status(201).json(created);
  } catch (err) { console.error(err); res.status(500).json({ error: "Erro ao criar post" }); }
});

app.put("/api/posts/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
    const [updated] = await db.update(posts).set(req.body).where(eq(posts.id, id)).returning();
    res.json(updated);
  } catch (err) { console.error(err); res.status(500).json({ error: "Erro ao atualizar post" }); }
});

app.delete("/api/posts/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
    await db.delete(posts).where(eq(posts.id, id));
    res.status(204).send();
  } catch (err) { console.error(err); res.status(500).json({ error: "Erro ao remover post" }); }
});

// ── VIP CODES ───────────────────────────────────────────────────────────────

app.get("/api/vip-codes", async (_req, res) => {
  try {
    const rows = await db.select().from(vipCodes).orderBy(vipCodes.created_at);
    res.json(rows);
  } catch (err) { console.error(err); res.status(500).json({ error: "Erro ao buscar codigos VIP" }); }
});

app.post("/api/vip-codes", requireAdmin, async (req, res) => {
  try {
    const parsed = insertVipCodeSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    const [created] = await db.insert(vipCodes).values(parsed.data).returning();
    res.status(201).json(created);
  } catch (err) { console.error(err); res.status(500).json({ error: "Erro ao criar codigo VIP" }); }
});

app.patch("/api/vip-codes/:id/toggle", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
    const [current] = await db.select().from(vipCodes).where(eq(vipCodes.id, id));
    if (!current) return res.status(404).json({ error: "Codigo nao encontrado" });
    const [updated] = await db.update(vipCodes)
      .set({ is_active: !current.is_active }).where(eq(vipCodes.id, id)).returning();
    res.json(updated);
  } catch (err) { console.error(err); res.status(500).json({ error: "Erro ao atualizar codigo VIP" }); }
});

app.delete("/api/vip-codes/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
    await db.delete(vipCodes).where(eq(vipCodes.id, id));
    res.status(204).send();
  } catch (err) { console.error(err); res.status(500).json({ error: "Erro ao remover codigo VIP" }); }
});

app.post("/api/vip-codes/validate", async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: "Código obrigatório" });
    const [vip] = await db.select().from(vipCodes).where(eq(vipCodes.code, String(code).toUpperCase()));
    if (!vip) return res.status(401).json({ error: "Código não encontrado" });
    if (!vip.is_active) return res.status(403).json({ error: "Acesso desativado" });
    res.json({ code: vip.code, client_name: vip.client_name });
  } catch (err) { console.error(err); res.status(500).json({ error: "Erro ao validar código" }); }
});

// ── ITINERARIES ─────────────────────────────────────────────────────────────

app.get("/api/itineraries", async (_req, res) => {
  try {
    const rows = await db.select().from(itineraries).orderBy(itineraries.created_at);
    res.json(rows);
  } catch (err) { console.error(err); res.status(500).json({ error: "Erro ao buscar roteiros" }); }
});

app.get("/api/itineraries/:vip_code", async (req, res) => {
  try {
    const code = req.params.vip_code.toUpperCase();
    const [itin] = await db.select().from(itineraries).where(eq(itineraries.vip_code, code));
    if (!itin) return res.status(404).json({ error: "Roteiro não encontrado" });
    res.json(itin);
  } catch (err) { console.error(err); res.status(500).json({ error: "Erro ao buscar roteiro" }); }
});

app.post("/api/itineraries", requireAdmin, async (req, res) => {
  try {
    const parsed = insertItinerarySchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    const [created] = await db.insert(itineraries).values(parsed.data).returning();
    res.status(201).json(created);
  } catch (err) { console.error(err); res.status(500).json({ error: "Erro ao criar roteiro" }); }
});

app.put("/api/itineraries/:vip_code", requireAdmin, async (req, res) => {
  try {
    const code = req.params.vip_code.toUpperCase();
    const [updated] = await db.update(itineraries).set(req.body).where(eq(itineraries.vip_code, code)).returning();
    if (!updated) return res.status(404).json({ error: "Roteiro não encontrado" });
    res.json(updated);
  } catch (err) { console.error(err); res.status(500).json({ error: "Erro ao atualizar roteiro" }); }
});

app.delete("/api/itineraries/:vip_code", requireAdmin, async (req, res) => {
  try {
    const code = req.params.vip_code.toUpperCase();
    await db.delete(itineraries).where(eq(itineraries.vip_code, code));
    res.status(204).send();
  } catch (err) { console.error(err); res.status(500).json({ error: "Erro ao remover roteiro" }); }
});

// ── NEWSLETTER ──────────────────────────────────────────────────────────────

app.post("/api/newsletter", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || typeof email !== 'string') return res.status(400).json({ error: "E-mail obrigatório" });
    await db.insert(newsletterSubscribers).values({ email: email.toLowerCase().trim() });
    res.status(201).json({ ok: true });
  } catch (err: any) {
    if (err?.code === '23505') return res.status(409).json({ error: "E-mail já registado" });
    console.error(err);
    res.status(500).json({ error: "Erro ao registar e-mail" });
  }
});

app.get("/api/newsletter", requireAdmin, async (_req, res) => {
  try {
    const rows = await db.select().from(newsletterSubscribers).orderBy(newsletterSubscribers.created_at);
    res.json(rows);
  } catch (err) { console.error(err); res.status(500).json({ error: "Erro ao buscar assinantes" }); }
});

// ── STATS ───────────────────────────────────────────────────────────────────

app.get("/api/stats", requireAdmin, async (_req, res) => {
  try {
    const [allDestinations, allPosts, allVipCodes, allNewsletter] = await Promise.all([
      db.select().from(destinations),
      db.select().from(posts),
      db.select().from(vipCodes),
      db.select().from(newsletterSubscribers),
    ]);
    res.json({
      destinations: allDestinations.length,
      postsPublished: allPosts.filter(p => p.status === 'published').length,
      postsDraft: allPosts.filter(p => p.status === 'draft').length,
      vipActive: allVipCodes.filter(v => v.is_active).length,
      vipTotal: allVipCodes.length,
      newsletterCount: allNewsletter.length,
    });
  } catch (err) { console.error(err); res.status(500).json({ error: "Erro ao buscar estatisticas" }); }
});

export default app;
