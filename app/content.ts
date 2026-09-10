export type Lang = 'fr' | 'en';

export const content = {
  fr: {
    nav: {
      about: "À propos",
      experience: "Expériences",
      projects: "Projets",
      skills: "Compétences",
      contact: "Contact"
    },
    roles: ["AI Engineer", "Backend Developer", "Data & LLM Engineer"],
    hero: {
      summary: "Étudiant ingénieur en Intelligence Artificielle et Technologies des Données. Je développe des solutions fiables, de la donnée au produit, avec un intérêt particulier pour les architectures RAG, les API et les systèmes intelligents.",
      cvButton: "Demander mon CV",
      subject: "Demande de CV"
    },
    about: {
      title: "À propos",
      p1: "<strong>Ingénieur IA en formation,</strong> je construis des applications capables de transformer des données et des modèles en outils concrets. Mon approche combine précision technique, architecture logicielle et attention au besoin utilisateur.",
      p2: "J'interviens sur le cycle complet : conception de backends, intégration de modèles de langage, préparation de données, déploiement Docker et tests. Je recherche des projets où l'intelligence artificielle apporte une valeur mesurable."
    },
    experience: {
      title: "Expériences",
      items: [
        {
          date: "Sept. 2025 — 2026",
          title: "AI Backend Engineer",
          company: "Arimayi · France",
          tasks: [
            "Conception d'un backend d'orchestration Python/FastAPI pour coordonner des services IA : analyse de sentiment, traduction, résumé et OCR.",
            "Communication asynchrone entre API centrale et micro-services, avec intégration de modèles LLM externes et base de données.",
            "Conteneurisation Docker, Docker Compose et stratégie de tests unitaires, intégration et end-to-end avec Pytest."
          ]
        },

        {
          date: "2025",
          title: "Développeur d'application intelligente",
          company: "Capgemini · à préciser",
          tasks: [
            "Application desktop en C# avec architecture RAG et modèles LLM pour automatiser des processus métier.",
            "Mécanismes d'automatisation et recherche contextuelle au sein de l'application."
          ]
        }
      ]
    },
    projects: {
      title: "Projets académiques",
      items: [
        { title: "Architecture RAG & Chatbot Intelligent", body: "Pipeline Retrieval-Augmented Generation avec base de connaissances indexée et interface conversationnelle capable de répondre à des questions contextuelles.", tags: ["RAG", "LangChain", "LlamaIndex", "Python"], note: "Projet personnel · 2025" },
        { title: "Prévision Forex EUR/USD", body: "Modèle prédictif de séries temporelles à base de LSTM, collecte via Alpha Vantage et analyses exploratoires approfondies.", tags: ["LSTM", "Pandas", "Scikit-learn", "API"], note: "Data Science · 2025" },
        { title: "Détection de tricherie — Computer Vision", body: "Système de surveillance de flux vidéo en temps réel pour identifier des comportements suspects en salle d’examen.", tags: ["OpenCV", "TensorFlow", "CNN", "Python"], note: "Computer Vision · 2025" },
        { title: "Simulateur de Bowling en Réalité Augmentée", body: "Expérience immersive de bowling conçue avec Unity et les technologies XR pour une interaction réaliste.", tags: ["Unity", "XR", "AR/VR"], note: "Immersive Tech · 2025" },
        { title: "Plateforme d’automatisation de recherche", body: "Plateforme qui automatise la recherche de stage et d’emploi, l’analyse des offres et la génération de documents.", tags: ["Next.js", "Supabase", "LLM", "LaTeX"], note: "Projet personnel · 2026" }
      ]
    },
    skills: {
      title: "Compétences",
      groups: [
        ["MACHINE LEARNING, IA & COMPUTER VISION", ["Python", "Scikit-learn", "PyTorch", "TensorFlow", "LSTM", "CNN", "OpenCV", "RAG"]],
        ["GENAI & NLP", ["LangChain", "LlamaIndex", "LLM", "NLP", "Agents", "Groq", "Recherche sémantique"]],
        ["ENGINEERING & MLOPS", ["FastAPI", "Docker", "Docker Compose", "REST API", "Git", "GitHub", "Pytest"]],
        ["DATA & CLOUD", ["SQL", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter", "Google Colab"]]
      ]
    },
    education: {
      title: "Formation",
      items: [
        { degree: "Cycle Ingénieur en Intelligence Artificielle & Technologies des Données", school: "ENSAM, Meknès", date: "2023 — 2027" },
        { degree: "Cycle Préparatoire Intégré", school: "ENSAM, Meknès", date: "2022 — 2023" }
      ]
    },
    certifications: {
      title: "Certifications",
      items: [
        { title: "Python for Data Science, AI & Development", issuer: "IBM / Coursera", date: "2025" },
        { title: "ML: Decision Trees & Random Forests", issuer: "365 Data Science", date: "2025" },
        { title: "SQL Fundamentals", issuer: "365 Data Science", date: "2026" }
      ]
    },
    contact: {
      title: "Contact",
      desc: "Une opportunité, un projet data/IA ou simplement échanger ? N'hésitez pas.",
      emailPlaceholder: "votre@email.com",
      button: "Écrivez-moi un email",
      successMsg: "Merci, votre message est prêt à être envoyé. Je vous répondrai rapidement."
    },
    footer: {
      rights: "© 2026 Yassine Lamghari · Tous droits réservés.",
      madeIn: "Fait avec attention au Maroc"
    }
  },
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact"
    },
    roles: ["AI Engineer", "Backend Developer", "Data & LLM Engineer"],
    hero: {
      summary: "AI & Data Engineering student. I build reliable solutions, from data to product, with a strong focus on RAG architectures, APIs, and intelligent systems.",
      cvButton: "Request my Resume",
      subject: "Resume Request"
    },
    about: {
      title: "About",
      p1: "<strong>As an AI Engineer in training,</strong> I build applications that turn data and models into real-world tools. My approach combines technical precision, software architecture, and a focus on user needs.",
      p2: "I work across the full cycle: backend design, LLM integration, data preparation, Docker deployment, and testing. I'm looking for projects where artificial intelligence brings measurable value."
    },
    experience: {
      title: "Experience",
      items: [
        {
          date: "Sept. 2025 — 2026",
          title: "AI Backend Engineer",
          company: "Arimayi · France",
          tasks: [
            "Designed a Python/FastAPI orchestration backend to coordinate AI services: sentiment analysis, translation, summarization, and OCR.",
            "Asynchronous communication between central API and microservices, with external LLM models and database integration.",
            "Docker containerization, Docker Compose, and unit/integration/E2E testing strategy using Pytest."
          ]
        },

        {
          date: "2025",
          title: "Intelligent Application Developer",
          company: "Capgemini · TBD",
          tasks: [
            "C# desktop application with RAG architecture and LLMs to automate business processes.",
            "Implemented automation mechanisms and contextual search within the application."
          ]
        }
      ]
    },
    projects: {
      title: "Academic Projects",
      items: [
        { title: "RAG Architecture & Smart Chatbot", body: "Retrieval-Augmented Generation pipeline with an indexed knowledge base and a conversational interface capable of answering contextual questions.", tags: ["RAG", "LangChain", "LlamaIndex", "Python"], note: "Personal Project · 2025" },
        { title: "EUR/USD Forex Forecasting", body: "LSTM-based time series predictive model, data collection via Alpha Vantage, and in-depth exploratory analysis.", tags: ["LSTM", "Pandas", "Scikit-learn", "API"], note: "Data Science · 2025" },
        { title: "Cheating Detection — Computer Vision", body: "Real-time video stream monitoring system to identify suspicious behaviors in exam rooms.", tags: ["OpenCV", "TensorFlow", "CNN", "Python"], note: "Computer Vision · 2025" },
        { title: "Augmented Reality Bowling Simulator", body: "Immersive bowling experience designed with Unity and XR technologies for realistic interaction.", tags: ["Unity", "XR", "AR/VR"], note: "Immersive Tech · 2025" },
        { title: "Job Search Automation Platform", body: "Platform that automates job/internship searches, analyzes offers, and generates documents.", tags: ["Next.js", "Supabase", "LLM", "LaTeX"], note: "Personal Project · 2026" }
      ]
    },
    skills: {
      title: "Skills",
      groups: [
        ["MACHINE LEARNING, AI & COMPUTER VISION", ["Python", "Scikit-learn", "PyTorch", "TensorFlow", "LSTM", "CNN", "OpenCV", "RAG"]],
        ["GENAI & NLP", ["LangChain", "LlamaIndex", "LLM", "NLP", "Agents", "Groq", "Semantic Search"]],
        ["ENGINEERING & MLOPS", ["FastAPI", "Docker", "Docker Compose", "REST API", "Git", "GitHub", "Pytest"]],
        ["DATA & CLOUD", ["SQL", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter", "Google Colab"]]
      ]
    },
    education: {
      title: "Education",
      items: [
        { degree: "Engineering Degree in Artificial Intelligence & Data Technologies", school: "ENSAM, Meknes", date: "2023 — 2027" },
        { degree: "Integrated Preparatory Classes", school: "ENSAM, Meknes", date: "2022 — 2023" }
      ]
    },
    certifications: {
      title: "Certifications",
      items: [
        { title: "Python for Data Science, AI & Development", issuer: "IBM / Coursera", date: "2025" },
        { title: "ML: Decision Trees & Random Forests", issuer: "365 Data Science", date: "2025" },
        { title: "SQL Fundamentals", issuer: "365 Data Science", date: "2026" }
      ]
    },
    contact: {
      title: "Contact",
      desc: "An opportunity, a data/AI project, or just want to chat? Reach out.",
      emailPlaceholder: "your@email.com",
      button: "Send me an email",
      successMsg: "Thank you, your message is ready to be sent. I will reply shortly."
    },
    footer: {
      rights: "© 2026 Yassine Lamghari · All rights reserved.",
      madeIn: "Crafted with care in Morocco"
    }
  }
};
