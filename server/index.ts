import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { destinations, insertDestinationSchema } from "./schema";

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

  
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);