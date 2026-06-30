import { createHmac, timingSafeEqual } from "crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createToken(secret: string): string {
  const expiry = String(Date.now() + SESSION_DURATION_MS);
  return `${expiry}.${sign(expiry, secret)}`;
}

export function verifyToken(token: string | undefined, secret: string): boolean {
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

export function requireAdmin(
  req: VercelRequest,
  res: VercelResponse,
  handler: () => Promise<void>
): Promise<void> {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    res.status(500).json({ error: "Configuração incompleta" });
    return Promise.resolve();
  }
  const token = req.headers["x-admin-token"] as string | undefined;
  if (!verifyToken(token, secret)) {
    res.status(401).json({ error: "Não autorizado" });
    return Promise.resolve();
  }
  return handler();
}
