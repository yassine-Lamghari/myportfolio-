import type { About, Certification, Contact, Education, Experience, Profile, Project, SkillGroup } from "./db";

export const fallbackProfile: Profile = {
  id: 1,
  name: "Yassine Lamghari",
  avatar: "/yassine-lamghari-new.jpg",
  roles: ["AI Engineer", "Backend Developer", "Data & LLM Engineer"],
  summary:
    "Étudiant ingénieur en Intelligence Artificielle et Technologies des Données. Je développe des solutions fiables, de la donnée au produit, avec un intérêt particulier pour les architectures RAG, les API et les systèmes intelligents.",
  email: "yassin.lamghari14@gmail.com",
  linkedin: "https://www.linkedin.com/in/yassine-lamghari-61b70b330/",
  github: "https://github.com/yassine-Lamghari",
};

export const fallbackAbout: About = {
  id: 1,
  paragraphs: [
    "<strong>Ingénieur IA en formation,</strong> je construis des applications capables de transformer des données et des modèles en outils concrets. Mon approche combine précision technique, architecture logicielle et attention au besoin utilisateur.",
    "J'interviens sur le cycle complet : conception de backends, intégration de modèles de langage, préparation de données, déploiement Docker et tests. Je recherche des projets où l'intelligence artificielle apporte une valeur mesurable.",
  ],
};

export const fallbackExperiences: Experience[] = [
  {
    id: 1,
    sort: 0,
    time: "Sept. 2025 — 2026",
    title: "AI Backend Engineer",
    company: "Arimayi · France",
    bullets: [
      "Conception d'un backend d'orchestration Python/FastAPI pour coordonner des services IA : analyse de sentiment, traduction, résumé et OCR.",
      "Communication asynchrone entre API centrale et micro-services, avec intégration de modèles LLM externes et base de données.",
      "Conteneurisation Docker, Docker Compose et stratégie de tests unitaires, intégration et end-to-end avec Pytest.",
    ],
  },
  {
    id: 2,
    sort: 1,
    time: "Juin — Sept. 2025",
    title: "Stagiaire IA",
    company: "CHU · Fès, Maroc",
    bullets: [
      "Développement d'un module de détection de maladies à partir de données patients.",
      "Système de recommandation de traitements personnalisés et chatbot médical d'orientation.",
    ],
  },
  {
    id: 3,
    sort: 2,
    time: "2025",
    title: "Développeur d'application intelligente",
    company: "Capgemini · à préciser",
    bullets: [
      "Application desktop en C# avec architecture RAG et modèles LLM pour automatiser des processus métier.",
      "Mécanismes d'automatisation et recherche contextuelle au sein de l'application.",
    ],
  },
];

export const fallbackProjects: Project[] = [
  {
    id: 1,
    sort: 0,
    title: "Architecture RAG & Chatbot Intelligent",
    body:
      "Pipeline Retrieval-Augmented Generation avec base de connaissances indexée et interface conversationnelle capable de répondre à des questions contextuelles.",
    tags: ["RAG", "LangChain", "LlamaIndex", "Python"],
    note: "Projet personnel · 2025",
  },
  {
    id: 2,
    sort: 1,
    title: "Prévision Forex EUR/USD",
    body:
      "Modèle prédictif de séries temporelles à base de LSTM, collecte via Alpha Vantage et analyses exploratoires approfondies.",
    tags: ["LSTM", "Pandas", "Scikit-learn", "API"],
    note: "Data Science · 2025",
  },
  {
    id: 3,
    sort: 2,
    title: "Détection de tricherie — Computer Vision",
    body:
      "Système de surveillance de flux vidéo en temps réel pour identifier des comportements suspects en salle d'examen.",
    tags: ["OpenCV", "TensorFlow", "CNN", "Python"],
    note: "Computer Vision · 2025",
  },
  {
    id: 4,
    sort: 3,
    title: "Simulateur de Bowling en Réalité Augmentée",
    body:
      "Expérience immersive de bowling conçue avec Unity et les technologies XR pour une interaction réaliste.",
    tags: ["Unity", "XR", "AR/VR"],
    note: "Immersive Tech · 2025",
  },
  {
    id: 5,
    sort: 4,
    title: "Plateforme d'automatisation de recherche",
    body:
      "Plateforme qui automatise la recherche de stage et d'emploi, l'analyse des offres et la génération de documents.",
    tags: ["Next.js", "Supabase", "LLM", "LaTeX"],
    note: "Projet personnel · 2026",
  },
];

export const fallbackSkillGroups: SkillGroup[] = [
  {
    id: 1,
    sort: 0,
    label: "MACHINE LEARNING, IA & COMPUTER VISION",
    tags: ["Python", "Scikit-learn", "PyTorch", "TensorFlow", "LSTM", "CNN", "OpenCV", "RAG"],
  },
  {
    id: 2,
    sort: 1,
    label: "GENAI & NLP",
    tags: ["LangChain", "LlamaIndex", "LLM", "NLP", "Agents", "Groq", "Recherche sémantique"],
  },
  {
    id: 3,
    sort: 2,
    label: "ENGINEERING & MLOPS",
    tags: ["FastAPI", "Docker", "Docker Compose", "REST API", "Git", "GitHub", "Pytest"],
  },
  {
    id: 4,
    sort: 3,
    label: "DATA & CLOUD",
    tags: ["SQL", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter", "Google Colab"],
  },
];

export const fallbackEducation: Education[] = [
  { id: 1, sort: 0, title: "Cycle Ingénieur en Intelligence Artificielle & Technologies des Données", place: "ENSAM, Meknès", time: "2023 — 2027" },
  { id: 2, sort: 1, title: "Cycle Préparatoire Intégré", place: "ENSAM, Meknès", time: "2022 — 2023" },
  { id: 3, sort: 2, title: "Baccalauréat Sciences Physiques", place: "Lycée El Mourabitine, Meknès", time: "2021 — 2022" },
];

export const fallbackCertifications: Certification[] = [
  { id: 1, sort: 0, title: "Python for Data Science, AI & Development", place: "IBM / Coursera", time: "2025" },
  { id: 2, sort: 1, title: "ML: Decision Trees & Random Forests", place: "365 Data Science", time: "2025" },
  { id: 3, sort: 2, title: "SQL Fundamentals", place: "365 Data Science", time: "2026" },
];

export const fallbackContact: Contact = {
  id: 1,
  intro: "Une opportunité, un projet data/IA ou simplement échanger ? N'hésitez pas.",
  button: "Écrivez-moi un email",
  placeholder: "votre@email.com",
  success: "Merci, votre message est prêt à être envoyé. Je vous répondrai rapidement.",
};
