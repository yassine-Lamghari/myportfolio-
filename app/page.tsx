"use client";

import { useEffect, useState } from "react";
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

const navItems = [["À propos", "about"], ["Expériences", "experience"], ["Projets", "projects"], ["Compétences", "skills"], ["Contact", "contact"]] as const;

type DataState = {
  profile: typeof fallbackProfile;
  about: typeof fallbackAbout;
  experiences: typeof fallbackExperiences;
  projects: typeof fallbackProjects;
  skillGroups: typeof fallbackSkillGroups;
  education: typeof fallbackEducation;
  certifications: typeof fallbackCertifications;
  contact: typeof fallbackContact;
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [roleIndex, setRoleIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [data, setData] = useState<DataState>({
    profile: fallbackProfile,
    about: fallbackAbout,
    experiences: fallbackExperiences,
    projects: fallbackProjects,
    skillGroups: fallbackSkillGroups,
    education: fallbackEducation,
    certifications: fallbackCertifications,
    contact: fallbackContact,
  });
  const [message, setMessage] = useState("");

  const goTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); setMessage(data.contact.success); };

  useEffect(() => {
    let cancelled = false;
    fetch("/api/content", { cache: "no-store" })
      .then((r) => r.json())
      .then((c: any) => {
        if (cancelled || !c?.ok) return;
        setData({
          profile: c.profile || fallbackProfile,
          about: c.about || fallbackAbout,
          experiences: (c.experiences?.length ? c.experiences : fallbackExperiences) as any,
          projects: (c.projects?.length ? c.projects : fallbackProjects) as any,
          skillGroups: (c.skillGroups?.length ? c.skillGroups : fallbackSkillGroups) as any,
          education: (c.education?.length ? c.education : fallbackEducation) as any,
          certifications: (c.certifications?.length ? c.certifications : fallbackCertifications) as any,
          contact: c.contact || fallbackContact,
        });
      })
      .catch(() => {});

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: "-28% 0px -58%", threshold: [0, 0.2, 0.5] });

    navItems.forEach(([, id]) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });

    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(available > 0 ? Math.min(100, (window.scrollY / available) * 100) : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    const roles = data.profile.roles?.length ? data.profile.roles : fallbackProfile.roles;
    const roleTimer = reduceMotion ? undefined : window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2600);

    return () => {
      cancelled = true;
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", updateProgress);
      if (roleTimer) window.clearInterval(roleTimer);
    };
  }, [data.profile.roles?.length]);

  const roles = data.profile.roles?.length ? data.profile.roles : fallbackProfile.roles;
  const brandInitials = (data.profile.name || fallbackProfile.name).split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
  const cvEmail = data.profile.email || fallbackProfile.email;
  const cvSubject = encodeURIComponent("Demande de CV");
  const cvLink = `mailto:${cvEmail}?subject=${cvSubject}`;
  const cvDirect = `mailto:${cvEmail}`;
  const year = new Date().getFullYear();

  return (
    <main className="cv-site">
      <header className="cv-topbar">
        <div className="cv-progress" aria-hidden="true"><span style={{ width: `${scrollProgress}%` }} /></div>
        <div className="cv-topbar-inner">
          <a className="cv-brand" href="#accueil" onClick={() => goTo("accueil")}><span>{brandInitials}</span> {data.profile.name}</a>
          <nav className={menuOpen ? "cv-nav is-open" : "cv-nav"} aria-label="Navigation">
            {navItems.map(([label, id]) => <button className={activeSection === id ? "is-active" : ""} aria-current={activeSection === id ? "page" : undefined} onClick={() => goTo(id)} key={id}>{label}</button>)}
          </nav>
          <button className="cv-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>Menu</button>
        </div>
      </header>

      <div className="cv-shell" id="accueil">
        <section className="cv-identity is-visible" data-reveal>
          <img className="cv-avatar" src={data.profile.avatar} alt={data.profile.name} />
          <div>
            <h1>{data.profile.name}</h1>
            <p className="cv-role"><span className="cv-role-swap" key={roles[roleIndex]}>{roles[roleIndex]}</span></p>
            <p className="cv-summary">{data.profile.summary}</p>
            <div className="cv-actions">
              <a href={cvLink}>Demander mon CV</a>
              <a href={data.profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={data.profile.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={cvDirect}>Email</a>
            </div>
          </div>
        </section>

        <section className="cv-section" id="about" data-reveal>
          <h2>À propos</h2>
          <div className="cv-copy">
            {data.about.paragraphs.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
          </div>
        </section>

        <section className="cv-section" id="experience" data-reveal>
          <h2>Expériences</h2>
          <div className="cv-timeline">
            {data.experiences.map((e) => (
              <article key={e.id}>
                <span className="cv-marker" />
                <div className="cv-time">{e.time}</div>
                <div>
                  <h3>{e.title} <em>{e.company}</em></h3>
                  <ul>
                    {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cv-section" id="projects" data-reveal>
          <h2>Projets académiques</h2>
          <div className="cv-project-grid">
            {data.projects.map((p) => (
              <article className="cv-project" key={p.id}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <div>{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                <small>{p.note}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="cv-section" id="skills" data-reveal>
          <h2>Compétences</h2>
          <div className="cv-skill-groups">
            {data.skillGroups.map((g) => (
              <div key={g.id}>
                <h3>{g.label}</h3>
                <p>{g.tags.map((t) => <span key={t}>{t}</span>)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cv-section" id="education" data-reveal>
          <h2>Formation</h2>
          <div className="cv-rows">
            {data.education.map((e) => (
              <div key={e.id}>
                <strong dangerouslySetInnerHTML={{ __html: e.title }} />
                <span>{e.place}</span>
                <time>{e.time}</time>
              </div>
            ))}
          </div>
        </section>

        <section className="cv-section" id="certifications" data-reveal>
          <h2>Certifications</h2>
          <div className="cv-rows cv-certifications">
            {data.certifications.map((c) => (
              <div key={c.id}>
                <strong dangerouslySetInnerHTML={{ __html: c.title }} />
                <span>{c.place}</span>
                <time>{c.time}</time>
              </div>
            ))}
          </div>
        </section>

        <section className="cv-section cv-contact" id="contact" data-reveal>
          <h2>Contact</h2>
          <div className="cv-contact-box">
            <p>{data.contact.intro}</p>
            <form onSubmit={sendMessage}>
              <input aria-label="Votre email" type="email" required placeholder={data.contact.placeholder} />
              <button type="submit">{data.contact.button}</button>
            </form>
            {message && <p className="cv-form-message" role="status">{message}</p>}
            <div>
              <a href={data.profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={data.profile.github} target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </section>
      </div>
      <footer className="cv-footer"><div>© {year} {data.profile.name} · Tous droits réservés.</div><div>Fait avec attention au Maroc</div></footer>
    </main>
  );
}
