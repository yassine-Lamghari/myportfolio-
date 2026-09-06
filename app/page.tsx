"use client";

import { useEffect, useState } from "react";

const navItems = [["À propos", "about"], ["Expériences", "experience"], ["Projets", "projects"], ["Compétences", "skills"], ["Contact", "contact"]] as const;
const rotatingRoles = ["AI Engineer", "Backend Developer", "Data & LLM Engineer"];

const projects = [
  { title: "Architecture RAG & Chatbot Intelligent", body: "Pipeline Retrieval-Augmented Generation avec base de connaissances indexée et interface conversationnelle capable de répondre à des questions contextuelles.", tags: ["RAG", "LangChain", "LlamaIndex", "Python"], note: "Projet personnel · 2025" },
  { title: "Prévision Forex EUR/USD", body: "Modèle prédictif de séries temporelles à base de LSTM, collecte via Alpha Vantage et analyses exploratoires approfondies.", tags: ["LSTM", "Pandas", "Scikit-learn", "API"], note: "Data Science · 2025" },
  { title: "Détection de tricherie — Computer Vision", body: "Système de surveillance de flux vidéo en temps réel pour identifier des comportements suspects en salle d’examen.", tags: ["OpenCV", "TensorFlow", "CNN", "Python"], note: "Computer Vision · 2025" },
  { title: "Simulateur de Bowling en Réalité Augmentée", body: "Expérience immersive de bowling conçue avec Unity et les technologies XR pour une interaction réaliste.", tags: ["Unity", "XR", "AR/VR"], note: "Immersive Tech · 2025" },
  { title: "Plateforme d’automatisation de recherche", body: "Plateforme qui automatise la recherche de stage et d’emploi, l’analyse des offres et la génération de documents.", tags: ["Next.js", "Supabase", "LLM", "LaTeX"], note: "Projet personnel · 2026" },
];

const skillGroups = [
  ["MACHINE LEARNING, IA & COMPUTER VISION", ["Python", "Scikit-learn", "PyTorch", "TensorFlow", "LSTM", "CNN", "OpenCV", "RAG"]],
  ["GENAI & NLP", ["LangChain", "LlamaIndex", "LLM", "NLP", "Agents", "Groq", "Recherche sémantique"]],
  ["ENGINEERING & MLOPS", ["FastAPI", "Docker", "Docker Compose", "REST API", "Git", "GitHub", "Pytest"]],
  ["DATA & CLOUD", ["SQL", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter", "Google Colab"]],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [activeSection, setActiveSection] = useState("about");
  const [roleIndex, setRoleIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const goTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); setMessage("Merci, votre message est prêt à être envoyé. Je vous répondrai rapidement."); };

  useEffect(() => {
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

    const roleTimer = reduceMotion ? undefined : window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % rotatingRoles.length);
    }, 2600);

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", updateProgress);
      if (roleTimer) window.clearInterval(roleTimer);
    };
  }, []);

  return (
    <main className="cv-site">
      <header className="cv-topbar">
        <div className="cv-progress" aria-hidden="true"><span style={{ width: `${scrollProgress}%` }} /></div>
        <div className="cv-topbar-inner">
          <a className="cv-brand" href="#accueil" onClick={() => goTo("accueil")}><span>YL</span> Yassine Lamghari</a>
          <nav className={menuOpen ? "cv-nav is-open" : "cv-nav"} aria-label="Navigation">
            {navItems.map(([label, id]) => <button className={activeSection === id ? "is-active" : ""} aria-current={activeSection === id ? "page" : undefined} onClick={() => goTo(id)} key={id}>{label}</button>)}
          </nav>
          <button className="cv-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>Menu</button>
        </div>
      </header>

      <div className="cv-shell" id="accueil">
        <section className="cv-identity is-visible" data-reveal>
          <img className="cv-avatar" src="/yassine-lamghari-new.jpg" alt="Yassine Lamghari" />
          <div>
            <h1>Yassine Lamghari</h1>
            <p className="cv-role"><span className="cv-role-swap" key={rotatingRoles[roleIndex]}>{rotatingRoles[roleIndex]}</span></p>
            <p className="cv-summary">Étudiant ingénieur en Intelligence Artificielle et Technologies des Données. Je développe des solutions fiables, de la donnée au produit, avec un intérêt particulier pour les architectures RAG, les API et les systèmes intelligents.</p>
            <div className="cv-actions"><a href="mailto:yassin.lamghari14@gmail.com?subject=Demande%20de%20CV">Demander mon CV</a><a href="https://linkedin.com/in/yassine-lamghari" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/yassine-Lamghari" target="_blank" rel="noreferrer">GitHub</a><a href="mailto:yassin.lamghari14@gmail.com">Email</a></div>
          </div>
        </section>

        <section className="cv-section" id="about" data-reveal><h2>À propos</h2><div className="cv-copy"><p><strong>Ingénieur IA en formation,</strong> je construis des applications capables de transformer des données et des modèles en outils concrets. Mon approche combine précision technique, architecture logicielle et attention au besoin utilisateur.</p><p>J&apos;interviens sur le cycle complet : conception de backends, intégration de modèles de langage, préparation de données, déploiement Docker et tests. Je recherche des projets où l&apos;intelligence artificielle apporte une valeur mesurable.</p></div></section>

        <section className="cv-section" id="experience" data-reveal><h2>Expériences</h2><div className="cv-timeline">
          <article><span className="cv-marker" /><div className="cv-time">Sept. 2025 — 2026</div><div><h3>AI Backend Engineer <em>Arimayi · France</em></h3><ul><li>Conception d&apos;un backend d&apos;orchestration Python/FastAPI pour coordonner des services IA : analyse de sentiment, traduction, résumé et OCR.</li><li>Communication asynchrone entre API centrale et micro-services, avec intégration de modèles LLM externes et base de données.</li><li>Conteneurisation Docker, Docker Compose et stratégie de tests unitaires, intégration et end-to-end avec Pytest.</li></ul></div></article>
          <article><span className="cv-marker" /><div className="cv-time">Juin — Sept. 2025</div><div><h3>Stagiaire IA <em>CHU · Fès, Maroc</em></h3><ul><li>Développement d&apos;un module de détection de maladies à partir de données patients.</li><li>Système de recommandation de traitements personnalisés et chatbot médical d&apos;orientation.</li></ul></div></article>
          <article><span className="cv-marker" /><div className="cv-time">2025</div><div><h3>Développeur d&apos;application intelligente <em>Capgemini · à préciser</em></h3><ul><li>Application desktop en C# avec architecture RAG et modèles LLM pour automatiser des processus métier.</li><li>Mécanismes d&apos;automatisation et recherche contextuelle au sein de l&apos;application.</li></ul></div></article>
        </div></section>

        <section className="cv-section" id="projects" data-reveal><h2>Projets académiques</h2><div className="cv-project-grid">{projects.map((project) => <article className="cv-project" key={project.title}><h3>{project.title}</h3><p>{project.body}</p><div>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><small>{project.note}</small></article>)}</div></section>

        <section className="cv-section" id="skills" data-reveal><h2>Compétences</h2><div className="cv-skill-groups">{skillGroups.map(([label, tags]) => <div key={label as string}><h3>{label as string}</h3><p>{(tags as string[]).map((tag) => <span key={tag}>{tag}</span>)}</p></div>)}</div></section>

        <section className="cv-section" id="education" data-reveal><h2>Formation</h2><div className="cv-rows"><div><strong>Cycle Ingénieur en Intelligence Artificielle &amp; Technologies des Données</strong><span>ENSAM, Meknès</span><time>2023 — 2027</time></div><div><strong>Cycle Préparatoire Intégré</strong><span>ENSAM, Meknès</span><time>2022 — 2023</time></div><div><strong>Baccalauréat Sciences Physiques</strong><span>Lycée El Mourabitine, Meknès</span><time>2021 — 2022</time></div></div></section>

        <section className="cv-section" id="certifications" data-reveal><h2>Certifications</h2><div className="cv-rows cv-certifications"><div><strong>Python for Data Science, AI &amp; Development</strong><span>IBM / Coursera</span><time>2025</time></div><div><strong>ML: Decision Trees &amp; Random Forests</strong><span>365 Data Science</span><time>2025</time></div><div><strong>SQL Fundamentals</strong><span>365 Data Science</span><time>2026</time></div></div></section>

        <section className="cv-section cv-contact" id="contact" data-reveal><h2>Contact</h2><div className="cv-contact-box"><p>Une opportunité, un projet data/IA ou simplement échanger ? N&apos;hésitez pas.</p><form onSubmit={sendMessage}><input aria-label="Votre email" type="email" required placeholder="votre@email.com" /><button type="submit">Écrivez-moi un email</button></form>{message && <p className="cv-form-message" role="status">{message}</p>}<div><a href="https://linkedin.com/in/yassine-lamghari" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/yassine-Lamghari" target="_blank" rel="noreferrer">GitHub</a></div></div></section>
      </div>
      <footer className="cv-footer"><div>© 2026 Yassine Lamghari · Tous droits réservés.</div><div>Fait avec attention au Maroc</div></footer>
    </main>
  );
}
