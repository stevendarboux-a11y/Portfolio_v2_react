// ============================================================
//  INFORMATIONS PERSONNELLES
//  Tout le texte "perso" du site est centralisé ici : pour mettre
//  à jour le portfolio
// ============================================================

const profile = {
  firstName: "Darboux",
  lastName: "Arnold",
  initials: "DA",

  // Les métiers qui défilent (effet "machine à écrire") sur l'accueil
  roles: [
    "Développeur Web Full Stack",
    "Développeur CRM",
    "Intégrateur web Front-end",
    "Meneur",
  ],

  tagline:
    "En formation développeur full stack, curieux, autonome, créatif, et altruiste je transforme des idées en applications web performantes.",

  availability: "Alternance à partir de décembre 2026",
  availabilityShort: "Déc. 2026",

  location: "Lille, Paris, France",
  email: "stevendarboux@gmail.com",

  socials: {
    github: "https://github.com/stevendarboux-a11y",
    linkedin: "https://linkedin.com/in/arnold-darboux",
  },

  // Photo de profil : place ton image dans /public (ex : public/photo.jpg)
  // puis écris "photo.jpg" ici. Laisse vide pour afficher tes initiales.
  photo: "",

  // CV : place ton PDF dans /public (ex : public/cv.pdf).
  cv: "cv.pdf",

  // Paragraphes de la page "À propos" (texte d'exemple à personnaliser)
  bio: [
    "Je suis actuellement en formation de développeur full stack a Epitech. J'aime concevoir des interfaces soignées autant que construire la logique qui les fait fonctionner.",
    "Mes projets m'ont amené à travailler sur toute la chaîne : du HTML/CSS au back-end en PHP ou Java, jusqu'à la conteneurisation avec Docker et l'intégration continue.",
    "Je recherche une alternance pour continuer à progresser au sein d'une équipe, sur des projets concrets. ",
  ],

  // Petites infos clés affichées sur la page "À propos"
  facts: [
    { label: "Statut", value: "Étudiant développeur full stack" },
    { label: "Recherche", value: "Alternance — déc. 2026" },
    { label: "Localisation", value: "Lille, Paris" },
  ],

  // Compétences regroupées par catégorie
  skills: [
    {
      category: "Frontend",
      items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Java / Spring Boot", "PHP / Laravel", "SQL / MySQL"],
    },
    {
      category: "Outils & DevOps",
      items: ["Git / GitHub", "Docker", "CI/CD (GitHub Actions)", "WordPress"],
    },
  ],

  // Parcours (formations + expériences), du plus récent au plus ancien.
  // type : "formation" ou "experience" (change l'icône de l'étape)
  journey: [
    {
      period: "2025 — 2027",
      title: "Titre professionnel Développement Web",
      place: "Epitech",
      description:
        "Formation intensive en développement web Full Stack, pédagogie par projets et méthodologie Agile, développement front-end et back-end, bonnes pratiques Git, Docker et CI/CD.",
      type: "formation",
    },
    {
      period: "2025 — 2 Mois",
      title: "Formation Développement Web B-Tech",
      place: "Association Z · EuraTechnologies — Lille",
      description:
        "Initiation intensive : workshops, mini-projets collaboratifs et projet final.",
      type: "formation",
    },
    {
      period: "2022 - 2024",
      title: "Bachelor Communication Digitale",
      place: "Studi",
      description:
        "Conceptions de stratégies de communication digitale (SEO, réseaux sociaux, webmarketing) et création des identités visuelles ainsi que des interfaces web (ergonomie UI/UX, charte graphique, maquettage).Réorientation assumée vers le développement web après avoir découvert le code via les projets digitaux du cursus.",
      type: "formation",
    },
    {
      period: "2023 - 2025",
      title: "Vendeur polyvalent & Responsable Merchandising",
      place: "Zara",
      description:
        "Analyse de données : Pilotage des décisions merchandising via l'étude des métriques de ventes. Gestion du stress & Priorités : Maintien d'un niveau d'exigence élevé en environnement à cadence soutenue. Travail d'équipe : Collaboration fluide et communication inter-équipes au quotidien.",
      type: "experience",
    },
  ],
};

export default profile;
