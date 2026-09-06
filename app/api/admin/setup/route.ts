import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { hashPassword, signToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password, secret } = body;
    if (typeof username !== "string" || typeof password !== "string") {
      return NextResponse.json({ ok: false, error: "Champs invalides" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ ok: false, error: "Mot de passe trop court (min 6)" }, { status: 400 });
    }
    const setupSecret = process.env.ADMIN_SETUP_SECRET;
    if (setupSecret && secret !== setupSecret) {
      return NextResponse.json({ ok: false, error: "Secret de setup invalide" }, { status: 401 });
    }
    const existing = await sql`SELECT COUNT(*)::int AS n FROM admins`.catch(() => ({ rows: [{ n: 0 }] }));
    if ((existing.rows[0] as { n: number }).n > 0 && !setupSecret) {
      return NextResponse.json({ ok: false, error: "Admin déjà existant. Définissez ADMIN_SETUP_SECRET pour en ajouter." }, { status: 409 });
    }
    const hash = await hashPassword(password);
    await sql`INSERT INTO admins (username, password_hash) VALUES (${username}, ${hash})
      ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash`;
    const token = signToken({ user: username });
    return NextResponse.json({ ok: true, token });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Erreur setup" }, { status: 500 });
  }
}
