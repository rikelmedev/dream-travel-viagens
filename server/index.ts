import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lista de destinos exclusivos para alimentar o frontend
const destinations = [
  {
    id: 1,
    title: "Atol de Baa",
    location: "Maldivas",
    image: "/images/maldivas.jpg",
    price: "8.500",
    rating: 5.0,
    size: "large",
  },
  {
    id: 2,
    title: "Ilha de Capri",
    location: "Itália",
    image: "/images/capri.jpg",
    price: "12.200",
    rating: 4.9,
    size: "medium",
  },
  {
    id: 3,
    title: "Zermatt",
    location: "Suíça",
    image: "/images/zermatt.jpg",
    price: "9.800",
    rating: 4.8,
    size: "small",
  },
  {
    id: 4,
    title: "Quioto",
    location: "Japão",
    image: "/images/kyoto.jpg",
    price: "7.400",
    rating: 5.0,
    size: "small",
  },
];

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Ativando parser para requisições com dados em formato json
  app.use(express.json());

  // Rota da API antes do gerenciador estático para interceptar os pedidos corretamente
  app.get("/api/destinations", (_req, res) => {
    res.json(destinations);
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

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);