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
          title: "Développeur Backend IA & Orchestration",
          company: "Arimayi, France",
          tasks: [
            "Orchestrateur d’IA – Architecture Microservices : conception d’un backend Python/FastAPI coordonnant plusieurs services IA de traduction, résumé, OCR et analyse de sentiment, avec communication inter-services, intégration LLM, Docker et tests unitaires, intégration et E2E.",
            "IA-Orchestrator – Orchestrateur LLM pédagogique multilingue : développement d’une API FastAPI intégrant détection/traduction, analyse d’intention et routage adaptatif vers LLM, RAG et GraphRAG. Mise en place d’évaluation automatique, fallbacks, retries, cache Redis, JWT, idempotence et rate limiting.",
            "Plateforme IA d’Audit de Code & Dette Technique : développement d’une plateforme SaaS d’analyse de repositories combinant analyse statique, RAG et LLM pour identifier la dette technique, les risques de sécurité et d’architecture, produire un scoring explicable et générer des recommandations de remédiation."
          ]
        },
        {
          date: "Juil. 2026 — Oct. 2026",
          title: "Stagiaire Software Engineer – VieSuivi",
          company: "Capgemini Engineering",
          tasks: [
            "Conception et développement de VieSuivi, application desktop Python de suivi industriel (APQP/PPAP, EI et projets) intégrant dashboard KPI, reporting, import/export Excel et persistance SQLite.",
            "Mise en place d’une architecture en couches (UI, services, repositories, base de données) et intégration de fonctionnalités RAG, LLM, embeddings et recherche vectorielle pour la recherche contextuelle dans les données.",
            "Développement des interfaces avec PySide6/Qt, persistance avec SQLAlchemy/SQLite, visualisation avec Matplotlib, automatisation Excel avec OpenPyXL, tests Pytest et génération de l’exécutable avec PyInstaller."
          ]
        }
      ]
    },
    projects: {
      title: "Projets clés",
      items: [
        { title: "Architecture RAG & Chatbot Intelligent", body: "Conception d’un pipeline Retrieval-Augmented Generation avec base de connaissances vectorisée et recherche sémantique pour générer des réponses contextuelles pertinentes.", tags: ["RAG", "LangChain", "LlamaIndex", "Python", "GraphRAG"], note: "Projet personnel · 2025" },
        { title: "Prévision du taux de change Forex EUR/USD", body: "Développement d’un modèle prédictif de séries temporelles basé sur des réseaux LSTM, avec collecte des données via Alpha Vantage et analyse avec Pandas et Scikit-learn.", tags: ["LSTM", "Pandas", "Scikit-learn", "API"], note: "Data Science · 2025" },
        { title: "Détection de tricherie – Computer Vision", body: "Développement d’un système d’analyse de flux vidéo en temps réel avec Python, OpenCV et TensorFlow pour détecter automatiquement des comportements suspects.", tags: ["OpenCV", "TensorFlow", "CNN", "Python"], note: "Computer Vision · 2025" },
        { title: "Simulateur de Bowling en Réalité Augmentée", body: "Expérience immersive de bowling conçue avec Unity et les technologies XR pour une interaction réaliste.", tags: ["Unity", "XR", "AR/VR"], note: "Immersive Tech · 2025" },
        { title: "Plateforme d’automatisation de recherche", body: "Plateforme qui automatise la recherche de stage et d’emploi, l’analyse des offres et la génération de documents.", tags: ["Next.js", "Supabase", "LLM", "LaTeX"], note: "Projet personnel · 2026" }
      ]
    },
    skills: {
      title: "Compétences Techniques",
      groups: [
        ["IA, LLM & RAG", ["LLM", "RAG", "GraphRAG", "NLP", "Embeddings", "Recherche Vectorielle", "Agents IA", "Prompt Engineering", "LangChain", "LlamaIndex", "FastEmbed", "Mistral", "Groq", "Gemini", "Ollama"]],
        ["MACHINE LEARNING & COMPUTER VISION", ["Scikit-learn", "PyTorch", "TensorFlow", "Keras", "LSTM", "CNN", "OpenCV", "Séries Temporelles"]],
        ["BACKEND & ARCHITECTURE", ["Python", "FastAPI", "Pydantic", "API REST", "Architectures Microservices", "Architecture en Couches", "JWT", "Idempotence", "Rate Limiting"]],
        ["DATA & BASES DE DONNÉES", ["PostgreSQL", "pgvector", "Neo4j", "Redis", "SQLite", "SQLAlchemy", "SQL", "NumPy", "Pandas", "Matplotlib", "OpenPyXL"]],
        ["DATA ENGINEERING", ["Kafka", "Airflow", "Spark", "Data Warehouse", "MinIO"]],
        ["DESKTOP, DEVOPS & QUALITÉ", ["PySide6/Qt", "Docker", "Docker Compose", "Git", "GitHub", "Pytest", "PyInstaller", "Semgrep", "Pylint", "Bandit"]]
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
          title: "AI & Orchestration Backend Developer",
          company: "Arimayi, France",
          tasks: [
            "AI Orchestrator – Microservices Architecture: Designed a Python/FastAPI backend coordinating multiple AI services (translation, summarization, OCR, sentiment analysis) with inter-service communication, LLM integration, Docker, and unit/integration/E2E testing.",
            "IA-Orchestrator – Multilingual Educational LLM Orchestrator: Developed a FastAPI API integrating detection/translation, intent analysis, and adaptive routing to LLM, RAG, and GraphRAG. Implemented automatic evaluation, fallbacks, retries, Redis caching, JWT, idempotency, and rate limiting.",
            "AI Platform for Code Audit & Technical Debt: Developed a SaaS repository analysis platform combining static analysis, RAG, and LLMs to identify technical debt, security/architecture risks, produce explainable scoring, and generate remediation recommendations."
          ]
        },
        {
          date: "Jul. 2026 — Oct. 2026",
          title: "Software Engineer Intern – VieSuivi",
          company: "Capgemini Engineering",
          tasks: [
            "Designed and developed VieSuivi, a Python desktop application for industrial tracking (APQP/PPAP, EI, and projects) featuring a KPI dashboard, reporting, Excel import/export, and SQLite persistence.",
            "Implemented a layered architecture (UI, services, repositories, database) and integrated RAG, LLM, embeddings, and vector search capabilities for contextual data retrieval.",
            "Developed interfaces with PySide6/Qt, persistence with SQLAlchemy/SQLite, data visualization with Matplotlib, Excel automation with OpenPyXL, Pytest testing, and executable generation with PyInstaller."
          ]
        }
      ]
    },
    projects: {
      title: "Key Projects",
      items: [
        { title: "RAG Architecture & Smart Chatbot", body: "Designed a Retrieval-Augmented Generation pipeline with a vectorized knowledge base and semantic search to generate relevant contextual responses.", tags: ["RAG", "LangChain", "LlamaIndex", "Python", "GraphRAG"], note: "Personal Project · 2025" },
        { title: "EUR/USD Forex Forecasting", body: "Developed an LSTM-based time series predictive model, with data collection via Alpha Vantage and analysis using Pandas and Scikit-learn.", tags: ["LSTM", "Pandas", "Scikit-learn", "API"], note: "Data Science · 2025" },
        { title: "Cheating Detection – Computer Vision", body: "Developed a real-time video stream analysis system using Python, OpenCV, and TensorFlow to automatically detect suspicious behaviors.", tags: ["OpenCV", "TensorFlow", "CNN", "Python"], note: "Computer Vision · 2025" },
        { title: "Augmented Reality Bowling Simulator", body: "Immersive bowling experience designed with Unity and XR technologies for realistic interaction.", tags: ["Unity", "XR", "AR/VR"], note: "Immersive Tech · 2025" },
        { title: "Job Search Automation Platform", body: "Platform that automates job/internship searches, analyzes offers, and generates documents.", tags: ["Next.js", "Supabase", "LLM", "LaTeX"], note: "Personal Project · 2026" }
      ]
    },
    skills: {
      title: "Technical Skills",
      groups: [
        ["AI, LLM & RAG", ["LLM", "RAG", "GraphRAG", "NLP", "Embeddings", "Vector Search", "AI Agents", "Prompt Engineering", "LangChain", "LlamaIndex", "FastEmbed", "Mistral", "Groq", "Gemini", "Ollama"]],
        ["MACHINE LEARNING & COMPUTER VISION", ["Scikit-learn", "PyTorch", "TensorFlow", "Keras", "LSTM", "CNN", "OpenCV", "Time Series"]],
        ["BACKEND & ARCHITECTURE", ["Python", "FastAPI", "Pydantic", "REST API", "Microservices Architectures", "Layered Architecture", "JWT", "Idempotency", "Rate Limiting"]],
        ["DATA & DATABASES", ["PostgreSQL", "pgvector", "Neo4j", "Redis", "SQLite", "SQLAlchemy", "SQL", "NumPy", "Pandas", "Matplotlib", "OpenPyXL"]],
        ["DATA ENGINEERING", ["Kafka", "Airflow", "Spark", "Data Warehouse", "MinIO"]],
        ["DESKTOP, DEVOPS & QUALITY", ["PySide6/Qt", "Docker", "Docker Compose", "Git", "GitHub", "Pytest", "PyInstaller", "Semgrep", "Pylint", "Bandit"]]
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
