import { sql } from "@vercel/postgres";

export type Profile = {
  id: number;
  name: string;
  avatar: string;
  roles: string[];
  summary: string;
  email: string;
  linkedin: string;
  github: string;
};

export type About = {
  id: number;
  paragraphs: string[];
};

export type Experience = {
  id: number;
  time: string;
  title: string;
  company: string;
  bullets: string[];
  sort: number;
};

export type Project = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  note: string;
  sort: number;
};

export type SkillGroup = {
  id: number;
  label: string;
  tags: string[];
  sort: number;
};

export type Education = {
  id: number;
  title: string;
  place: string;
  time: string;
  sort: number;
};

export type Certification = {
  id: number;
  title: string;
  place: string;
  time: string;
  sort: number;
};

export type Contact = {
  id: number;
  intro: string;
  button: string;
  placeholder: string;
  success: string;
};

export type AdminUser = {
  id: number;
  username: string;
  password_hash: string;
};

export async function ensureSchema() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS profile (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        avatar TEXT NOT NULL,
        roles JSONB NOT NULL DEFAULT '[]'::jsonb,
        summary TEXT NOT NULL,
        email TEXT NOT NULL,
        linkedin TEXT NOT NULL,
        github TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS about (
        id SERIAL PRIMARY KEY,
        paragraphs JSONB NOT NULL DEFAULT '[]'::jsonb
      );
      CREATE TABLE IF NOT EXISTS experiences (
        id SERIAL PRIMARY KEY,
        time TEXT NOT NULL,
        title TEXT NOT NULL,
        company TEXT NOT NULL,
        bullets JSONB NOT NULL DEFAULT '[]'::jsonb,
        sort INT NOT NULL DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        tags JSONB NOT NULL DEFAULT '[]'::jsonb,
        note TEXT NOT NULL,
        sort INT NOT NULL DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS skill_groups (
        id SERIAL PRIMARY KEY,
        label TEXT NOT NULL,
        tags JSONB NOT NULL DEFAULT '[]'::jsonb,
        sort INT NOT NULL DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS education (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        place TEXT NOT NULL,
        time TEXT NOT NULL,
        sort INT NOT NULL DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS certifications (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        place TEXT NOT NULL,
        time TEXT NOT NULL,
        sort INT NOT NULL DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS contact (
        id SERIAL PRIMARY KEY,
        intro TEXT NOT NULL,
        button TEXT NOT NULL,
        placeholder TEXT NOT NULL,
        success TEXT NOT NULL
      );
    `;
  } catch (e) {
    console.warn("ensureSchema skipped (no DB connection available):", e);
  }
}

export async function getProfile(): Promise<Profile | null> {
  try {
    const res = await sql`SELECT * FROM profile ORDER BY id ASC LIMIT 1`;
    return (res.rows[0] as Profile) || null;
  } catch {
    return null;
  }
}

export async function getAbout(): Promise<About | null> {
  try {
    const res = await sql`SELECT * FROM about ORDER BY id ASC LIMIT 1`;
    return (res.rows[0] as About) || null;
  } catch {
    return null;
  }
}

export async function getExperiences(): Promise<Experience[]> {
  try {
    const res = await sql`SELECT * FROM experiences ORDER BY sort ASC, id ASC`;
    return res.rows as Experience[];
  } catch {
    return [];
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const res = await sql`SELECT * FROM projects ORDER BY sort ASC, id ASC`;
    return res.rows as Project[];
  } catch {
    return [];
  }
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  try {
    const res = await sql`SELECT * FROM skill_groups ORDER BY sort ASC, id ASC`;
    return res.rows as SkillGroup[];
  } catch {
    return [];
  }
}

export async function getEducation(): Promise<Education[]> {
  try {
    const res = await sql`SELECT * FROM education ORDER BY sort ASC, id ASC`;
    return res.rows as Education[];
  } catch {
    return [];
  }
}

export async function getCertifications(): Promise<Certification[]> {
  try {
    const res = await sql`SELECT * FROM certifications ORDER BY sort ASC, id ASC`;
    return res.rows as Certification[];
  } catch {
    return [];
  }
}

export async function getContact(): Promise<Contact | null> {
  try {
    const res = await sql`SELECT * FROM contact ORDER BY id ASC LIMIT 1`;
    return (res.rows[0] as Contact) || null;
  } catch {
    return null;
  }
}

export async function getAdminUser(username: string): Promise<AdminUser | null> {
  try {
    const res = await sql`SELECT * FROM admins WHERE username = ${username} LIMIT 1`;
    return (res.rows[0] as AdminUser) || null;
  } catch {
    return null;
  }
}
