<div align="center">
  <img src=".github/screenshots/hero.png" alt="Dream Travel — Hero" width="100%"/>

  <br/><br/>

  # DREAM*TRAVEL*
  ### Plataforma de curadoria de viagens de luxo — experiências sob medida para quem exige o extraordinário.

  <br/>

  [![Live Demo](https://img.shields.io/badge/▶%20LIVE%20DEMO-dream--travel--viagens.vercel.app-C18D41?style=for-the-badge&logoColor=white)](https://dream-travel-viagens.vercel.app)
  &nbsp;
  [![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)
  &nbsp;
  [![Stack](https://img.shields.io/badge/Stack-React%20%2B%20TypeScript-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

</div>

---

## 📸 Capturas do Projecto

<table>
  <tr>
    <td width="50%" valign="top">
      <img src=".github/screenshots/blog.png" alt="Diário de Viagens" width="100%"/>
      <p align="center"><sub>✍️ <strong>Diário de Viagens</strong> — Journal editorial de alto padrão</sub></p>
    </td>
    <td width="50%" valign="top">
      <img src=".github/screenshots/sobre.png" alt="A Curadora" width="100%"/>
      <p align="center"><sub>👤 <strong>A Curadora</strong> — Página de apresentação da Jackeline</sub></p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <img src=".github/screenshots/destinos.png" alt="Portfólio Global" width="100%"/>
      <p align="center"><sub>🌍 <strong>Portfólio Global</strong> — Catálogo de destinos exclusivos</sub></p>
    </td>
    <td width="50%" valign="top">
      <img src=".github/screenshots/admin.png" alt="Control Room" width="100%"/>
      <p align="center"><sub>🔐 <strong>Control Room</strong> — Painel administrativo restrito</sub></p>
    </td>
  </tr>
</table>

---

## ✨ Funcionalidades

| Feature | Descrição |
|---|---|
| 🌍 **Portfólio Global** | Catálogo de destinos com design editorial, filtros por categoria e animações fluidas |
| ✍️ **Journal de Viagens** | Blog com estética de revista de luxo, artigos em destaque e categorias |
| 🔐 **Área VIP do Cliente** | Portal restrito com roteiro personalizado acessível via código exclusivo |
| 🛡️ **Control Room** | Painel admin com CRUD completo de destinos, posts, códigos VIP e newsletter |
| 📧 **Círculo Restrito** | Newsletter com lista de assinantes e exportação CSV |
| 🔑 **Auth Stateless** | Autenticação HMAC-SHA256 sem sessões em memória — compatível com serverless |

---

## 🛠 Stack Tecnológica

**Frontend**

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EF008F?style=flat-square&logo=framer&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)

**Backend & Dados**

![Node.js](https://img.shields.io/badge/Node.js-Serverless-5FA04E?style=flat-square&logo=nodedotjs&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.45-C5F74F?style=flat-square&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel_Serverless-000000?style=flat-square&logo=vercel&logoColor=white)

---

## 🚀 Como Executar Localmente

```bash
# 1. Clonar o repositório
git clone https://github.com/rikelmedev/dream-travel-viagens.git
cd dream-travel-viagens

# 2. Instalar dependências
pnpm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com DATABASE_URL e ADMIN_PASSWORD

# 4. Iniciar o servidor de desenvolvimento
pnpm dev
```

> O frontend fica em `http://localhost:5173` e a API Express em `http://localhost:3000`.

---

## 📁 Estrutura do Projecto

```
├── api/
│   └── index.ts          # Serverless function única (Vercel)
├── client/
│   └── src/
│       ├── components/   # Componentes reutilizáveis
│       ├── pages/        # Páginas (Home, Destinos, Blog, VIP, Admin)
│       └── contexts/     # Auth context
├── server/
│   ├── app.ts            # Express app (desenvolvimento local)
│   ├── db.ts             # Conexão Drizzle + Supabase
│   └── schema.ts         # Schema das tabelas
└── vercel.json           # Configuração de deploy e rewrites
```

---

<div align="center">
  <sub>Desenvolvido por <a href="https://github.com/rikelmedev">Rikelme</a> · Plataforma exclusiva para <strong>Dream Travel Viagens</strong></sub>
</div>
