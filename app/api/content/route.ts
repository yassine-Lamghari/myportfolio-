import { NextResponse } from "next/server";
import { getAuthFromCookie, getAuthFromHeader } from "@/lib/auth";
import {
  ensureSchema,
  getAbout,
  getCertifications,
  getContact,
  getEducation,
  getExperiences,
  getProfile,
  getProjects,
  getSkillGroups,
} from "@/lib/db";
import {
  fallbackAbout,
  fallbackCertifications,
  fallbackContact,
  fallbackEducation,
  fallbackExperiences,
  fallbackProfile,
  fallbackProjects,
  fallbackSkillGroups,
} from "@/lib/fallback";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  await ensureSchema();
  const fromHeader = !!getAuthFromHeader(req.headers);
  const cookie = req.headers.get("cookie");
  const fromCookie = !!getAuthFromCookie(cookie);
  const authed = fromHeader || fromCookie;

  const [profile, about, experiences, projects, skillGroups, education, certifications, contact] =
    await Promise.all([
      getProfile(),
      getAbout(),
      getExperiences(),
      getProjects(),
      getSkillGroups(),
      getEducation(),
      getCertifications(),
      getContact(),
    ]);

  return NextResponse.json({
    ok: true,
    authed,
    profile: profile || fallbackProfile,
    about: about || fallbackAbout,
    experiences: experiences.length ? experiences : fallbackExperiences,
    projects: projects.length ? projects : fallbackProjects,
    skillGroups: skillGroups.length ? skillGroups : fallbackSkillGroups,
    education: education.length ? education : fallbackEducation,
    certifications: certifications.length ? certifications : fallbackCertifications,
    contact: contact || fallbackContact,
  });
}
