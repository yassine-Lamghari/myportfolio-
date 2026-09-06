import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/db";
import { signToken, verifyPassword } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;
    if (typeof username !== "string" || typeof password !== "string") {
      return NextResponse.json({ ok: false, error: "Champs invalides" }, { status: 400 });
    }
    const user = await getAdminUser(username);
    if (!user) {
      return NextResponse.json({ ok: false, error: "Identifiants invalides" }, { status: 401 });
    }
    const ok = await verifyPassword(password, user.password_hash);
    if (!ok) {
      return NextResponse.json({ ok: false, error: "Identifiants invalides" }, { status: 401 });
    }
    const token = signToken({ user: username });
    const res = NextResponse.json({ ok: true, token, username });
    res.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Erreur login" }, { status: 500 });
  }
}
