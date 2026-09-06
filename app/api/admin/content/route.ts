import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getAuthFromCookie, getAuthFromHeader } from "@/lib/auth";

export const runtime = "nodejs";

function guard(req: Request) {
  const auth = getAuthFromHeader(req.headers) || getAuthFromCookie(req.headers.get("cookie"));
  if (!auth) return NextResponse.json({ ok: false, error: "Non autorisé" }, { status: 401 });
  return null;
}

type Section = "profile" | "about" | "contact";
type ListSection = "experiences" | "projects" | "skill_groups" | "education" | "certifications";

export async function POST(req: Request) {
  const err = guard(req);
  if (err) return err;
  try {
    const body = await req.json();
    const section = body.section as Section | ListSection;
    const data = body.data;
    if (!section || !data) throw new Error("section/data requis");

    if (section === "profile") {
      const { name, avatar, roles, summary, email, linkedin, github } = data;
      await sql`DELETE FROM profile`;
      await sql`INSERT INTO profile (name, avatar, roles, summary, email, linkedin, github)
        VALUES (${name}, ${avatar}, ${JSON.stringify(roles)}::jsonb, ${summary}, ${email}, ${linkedin}, ${github})`;
    } else if (section === "about") {
      await sql`DELETE FROM about`;
      await sql`INSERT INTO about (paragraphs) VALUES (${JSON.stringify(data.paragraphs)}::jsonb)`;
    } else if (section === "contact") {
      const { intro, button, placeholder, success } = data;
      await sql`DELETE FROM contact`;
      await sql`INSERT INTO contact (intro, button, placeholder, success)
        VALUES (${intro}, ${button}, ${placeholder}, ${success})`;
    } else if (section === "experiences") {
      await sql`DELETE FROM experiences`;
      for (const e of data as any[]) {
        await sql`INSERT INTO experiences (time, title, company, bullets, sort)
          VALUES (${e.time}, ${e.title}, ${e.company}, ${JSON.stringify(e.bullets || [])}::jsonb, ${Number(e.sort) || 0})`;
      }
    } else if (section === "projects") {
      await sql`DELETE FROM projects`;
      for (const p of data as any[]) {
        await sql`INSERT INTO projects (title, body, tags, note, sort)
          VALUES (${p.title}, ${p.body}, ${JSON.stringify(p.tags || [])}::jsonb, ${p.note}, ${Number(p.sort) || 0})`;
      }
    } else if (section === "skill_groups") {
      await sql`DELETE FROM skill_groups`;
      for (const s of data as any[]) {
        await sql`INSERT INTO skill_groups (label, tags, sort)
          VALUES (${s.label}, ${JSON.stringify(s.tags || [])}::jsonb, ${Number(s.sort) || 0})`;
      }
    } else if (section === "education") {
      await sql`DELETE FROM education`;
      for (const e of data as any[]) {
        await sql`INSERT INTO education (title, place, time, sort)
          VALUES (${e.title}, ${e.place}, ${e.time}, ${Number(e.sort) || 0})`;
      }
    } else if (section === "certifications") {
      await sql`DELETE FROM certifications`;
      for (const c of data as any[]) {
        await sql`INSERT INTO certifications (title, place, time, sort)
          VALUES (${c.title}, ${c.place}, ${c.time}, ${Number(c.sort) || 0})`;
      }
    } else {
      throw new Error("Section inconnue: " + section);
    }
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Erreur" }, { status: 500 });
  }
}
