"use client";

import { useEffect, useState } from "react";
import { content, Lang } from "./content";
import { useTheme } from "next-themes";
import { motion, Variants, AnimatePresence } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("fr");
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [activeSection, setActiveSection] = useState("about");
  const [roleIndex, setRoleIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const t = content[lang];
  
  const navItems = [
    [t.nav.about, "about"], 
    [t.nav.experience, "experience"], 
    [t.nav.projects, "projects"], 
    [t.nav.skills, "skills"], 
    [t.nav.contact, "contact"]
  ] as const;

  const goTo = (id: string) => { 
    setMenuOpen(false); 
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); 
  };
  
  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault(); 
    setMessage(t.contact.successMsg); 
  };

  // Avoid hydration mismatch for theme toggle
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 1500); // 1.5 seconds delay
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // We no longer need the revealObserver, framer-motion handles it via whileInView

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

    const roleTimer = reduceMotion ? undefined : window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % t.roles.length);
    }, 2600);

    document.documentElement.lang = lang;

    return () => {
      sectionObserver.disconnect();
      window.removeEventListener("scroll", updateProgress);
      if (roleTimer) window.clearInterval(roleTimer);
    };
  }, [lang, t.roles.length, navItems]); // Note: navItems is redefined on render, but practically it's fine.

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              width: '100vw',
              position: 'fixed',
              top: 0,
              left: 0,
              backgroundColor: 'var(--bg)',
              zIndex: 9999
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              style={{
                width: '50px',
                height: '50px',
                border: '4px solid var(--line, rgba(169,191,235,.15))',
                borderTop: '4px solid var(--blue, #377dff)',
                borderRadius: '50%',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="cv-site">
      <header className="cv-topbar">
        <div className="cv-progress" aria-hidden="true"><span style={{ width: `${scrollProgress}%` }} /></div>
        <div className="cv-topbar-inner">
          <a className="cv-brand" href="#accueil" onClick={() => goTo("accueil")}><span>YL</span> Yassine Lamghari</a>
          
          <nav className={menuOpen ? "cv-nav is-open" : "cv-nav"} aria-label="Navigation">
            {navItems.map(([label, id]) => (
              <button 
                className={activeSection === id ? "is-active" : ""} 
                aria-current={activeSection === id ? "page" : undefined} 
                onClick={() => goTo(id)} 
                key={id}
              >
                {label}
              </button>
            ))}
            
            <div style={{ display: 'flex', gap: '8px', marginLeft: '12px', alignItems: 'center' }}>
              {/* Language Toggle */}
              <button 
                onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              >
                {lang === 'fr' ? 'EN' : 'FR'}
              </button>

              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                >
                  {resolvedTheme === 'dark' ? 'Light' : 'Dark'}
                </button>
              )}
            </div>
          </nav>
          <button className="cv-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>Menu</button>
        </div>
      </header>

      <div className="cv-shell" id="accueil">
        <motion.section 
          className="cv-identity"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <img className="cv-avatar" src="/profile-photo.jpeg" alt="Yassine Lamghari" />
          <div>
            <h1>Yassine Lamghari</h1>
            <p className="cv-role"><span className="cv-role-swap" key={t.roles[roleIndex]}>{t.roles[roleIndex]}</span></p>
            <p className="cv-summary">{t.hero.summary}</p>
            <div className="cv-actions">
              <a href={`mailto:yassin.lamghari14@gmail.com?subject=${encodeURIComponent(t.hero.subject)}`}>{t.hero.cvButton}</a>
              <a href="https://www.linkedin.com/in/yassine-lamghari-61b70b330/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://github.com/yassine-Lamghari" target="_blank" rel="noreferrer">GitHub</a>
              <a href="mailto:yassin.lamghari14@gmail.com">Email</a>
            </div>
          </div>
        </motion.section>

        <motion.section className="cv-section" id="about" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <h2>{t.about.title}</h2>
          <div className="cv-copy">
            <p dangerouslySetInnerHTML={{ __html: t.about.p1 }}></p>
            <p>{t.about.p2}</p>
          </div>
        </motion.section>

        <motion.section className="cv-section" id="experience" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <h2>{t.experience.title}</h2>
          <div className="cv-timeline">
            {t.experience.items.map((exp, idx) => (
              <article key={idx}>
                <span className="cv-marker" />
                <div className="cv-time">{exp.date}</div>
                <div>
                  <h3>{exp.title} <em>{exp.company}</em></h3>
                  <ul>
                    {exp.tasks.map((task, i) => <li key={i}>{task}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section className="cv-section" id="projects" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <h2>{t.projects.title}</h2>
          <div className="cv-timeline">
            {t.projects.items.map((project, idx) => (
              <article key={idx}>
                <span className="cv-marker" />
                <div className="cv-time">{project.note}</div>
                <div>
                  <h3>{project.title}</h3>
                  <ul>
                    <li>{project.body}</li>
                    <li><strong>Technologies :</strong> {project.tags.join(', ')}</li>
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section className="cv-section" id="skills" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <h2>{t.skills.title}</h2>
          <div className="cv-skill-groups">
            {t.skills.groups.map(([label, tags]) => (
              <div key={label as string}>
                <h3>{label as string}</h3>
                <p>
                  {(tags as string[]).map((tag) => {
                    const iconMap: Record<string, string> = {
                      "Python": "python",
                      "Scikit-learn": "scikitlearn",
                      "PyTorch": "pytorch",
                      "TensorFlow": "tensorflow",
                      "Keras": "keras",
                      "OpenCV": "opencv",
                      "LangChain": "langchain",
                      "LlamaIndex": "https://www.google.com/s2/favicons?domain=llamaindex.ai&sz=128",
                      "Mistral": "mistralai",
                      "Groq": "https://www.google.com/s2/favicons?domain=groq.com&sz=128",
                      "Gemini": "googlegemini",
                      "Ollama": "ollama",
                      "FastAPI": "fastapi",
                      "Pydantic": "pydantic",
                      "PostgreSQL": "postgresql",
                      "Neo4j": "neo4j",
                      "Redis": "redis",
                      "SQLite": "sqlite",
                      "SQLAlchemy": "sqlalchemy",
                      "NumPy": "numpy",
                      "Pandas": "pandas",
                      "Kafka": "apachekafka",
                      "Airflow": "apacheairflow",
                      "Spark": "apachespark",
                      "MinIO": "minio",
                      "PySide6/Qt": "qt",
                      "Docker": "docker",
                      "Docker Compose": "docker",
                      "Git": "git",
                      "GitHub": "github",
                      "Pytest": "pytest",
                      "Semgrep": "https://www.google.com/s2/favicons?domain=semgrep.dev&sz=128",
                      "Jupyter": "jupyter",
                      "Google Colab": "googlecolab",
                      "SQL": "postgresql"
                    };
                    const iconSlug = iconMap[tag];
                    const imgSrc = iconSlug?.startsWith("http") ? iconSlug : `https://cdn.simpleicons.org/${iconSlug}`;
                    return (
                      <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        {iconSlug && (
                          <img 
                            src={imgSrc} 
                            alt={tag} 
                            style={{ width: '14px', height: '14px' }} 
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                          />
                        )}
                        {tag}
                      </span>
                    );
                  })}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section className="cv-section" id="education" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <h2>{t.education.title}</h2>
          <div className="cv-rows">
            {t.education.items.map((edu, idx) => (
              <div key={idx}>
                <strong>{edu.degree}</strong>
                <span>{edu.school}</span>
                <time>{edu.date}</time>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section className="cv-section" id="certifications" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <h2>{t.certifications.title}</h2>
          <div className="cv-rows cv-certifications">
            {t.certifications.items.map((cert, idx) => (
              <div key={idx}>
                <strong>{cert.title}</strong>
                <span>{cert.issuer}</span>
                <time>{cert.date}</time>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section className="cv-section cv-contact" id="contact" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <h2>{t.contact.title}</h2>
          <div className="cv-contact-box">
            <p>{t.contact.desc}</p>
            <form onSubmit={sendMessage}>
              <input aria-label="Email" type="email" required placeholder={t.contact.emailPlaceholder} />
              <button type="submit">{t.contact.button}</button>
            </form>
            {message && <p className="cv-form-message" role="status">{message}</p>}
            <div>
              <a href="https://www.linkedin.com/in/yassine-lamghari-61b70b330/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://github.com/yassine-Lamghari" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </motion.section>
      </div>
      
      <footer className="cv-footer">
        <div>{t.footer.rights}</div>
        <div>{t.footer.madeIn}</div>
      </footer>
    </main>
    </>
  );
}
