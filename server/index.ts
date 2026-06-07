import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { eq } from "drizzle-orm";
import { db } from "./db";
import {
  destinations, insertDestinationSchema,
  posts, insertPostSchema,
  vipCodes, insertVipCodeSchema,
} from "./schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.use(express.json());

  app.get("/api/destinations", async (_req, res) => {
    try {
      const rows = await db.select().from(destinations);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar destinos" });
    }
  });

  app.post("/api/destinations", async (req, res) => {
    try {
      const parsed = insertDestinationSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
      }
      const [created] = await db.insert(destinations).values(parsed.data).returning();
      res.status(201).json(created);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao criar destino" });
    }
  });

  app.delete("/api/destinations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
      await db.delete(destinations).where(eq(destinations.id, id));
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao remover destino" });
    }
  });

  // ── POSTS ──────────────────────────────────────────────────────────────────

  app.get("/api/posts", async (_req, res) => {
    try {
      const rows = await db.select().from(posts).orderBy(posts.created_at);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar posts" });
    }
  });

  app.post("/api/posts", async (req, res) => {
    try {
      const parsed = insertPostSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
      const [created] = await db.insert(posts).values(parsed.data).returning();
      res.status(201).json(created);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao criar post" });
    }
  });

  app.put("/api/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
      const [updated] = await db.update(posts).set(req.body).where(eq(posts.id, id)).returning();
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao atualizar post" });
    }
  });

  app.delete("/api/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
      await db.delete(posts).where(eq(posts.id, id));
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao remover post" });
    }
  });

  // ── VIP CODES ──────────────────────────────────────────────────────────────

  app.get("/api/vip-codes", async (_req, res) => {
    try {
      const rows = await db.select().from(vipCodes).orderBy(vipCodes.created_at);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar codigos VIP" });
    }
  });

  app.post("/api/vip-codes", async (req, res) => {
    try {
      const parsed = insertVipCodeSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
      const [created] = await db.insert(vipCodes).values(parsed.data).returning();
      res.status(201).json(created);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao criar codigo VIP" });
    }
  });

  app.patch("/api/vip-codes/:id/toggle", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
      const [current] = await db.select().from(vipCodes).where(eq(vipCodes.id, id));
      if (!current) return res.status(404).json({ error: "Codigo nao encontrado" });
      const [updated] = await db.update(vipCodes)
        .set({ is_active: !current.is_active })
        .where(eq(vipCodes.id, id))
        .returning();
      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao atualizar codigo VIP" });
    }
  });

  app.delete("/api/vip-codes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
      await db.delete(vipCodes).where(eq(vipCodes.id, id));
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao remover codigo VIP" });
    }
  });

  // ── DASHBOARD STATS ────────────────────────────────────────────────────────

  app.get("/api/stats", async (_req, res) => {
    try {
      const [allDestinations, allPosts, allVipCodes] = await Promise.all([
        db.select().from(destinations),
        db.select().from(posts),
        db.select().from(vipCodes),
      ]);
      res.json({
        destinations: allDestinations.length,
        postsPublished: allPosts.filter(p => p.status === 'published').length,
        postsDraft: allPosts.filter(p => p.status === 'draft').length,
        vipActive: allVipCodes.filter(v => v.is_active).length,
        vipTotal: allVipCodes.length,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao buscar estatisticas" });
    }
  });

  
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3001;

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);