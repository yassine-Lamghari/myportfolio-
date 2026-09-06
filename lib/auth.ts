import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "change-me-in-production-please-12345";

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: { user: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string | undefined | null): { user: string } | null {
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as { user: string };
  } catch {
    return null;
  }
}

export function getAuthFromHeader(headers: Headers): { user: string } | null {
  const auth = headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return verifyToken(auth.slice(7));
}

export function getAuthFromCookie(cookie: string | null): { user: string } | null {
  if (!cookie) return null;
  const match = cookie.split("; ").find((c) => c.startsWith("admin_token="));
  const token = match?.split("=")[1];
  return verifyToken(token);
}
