// ============================================================
//  MES PROJETS
//  - image : chemin vers une capture (ex : importée depuis src/assets).
//    Laisse "" pour afficher un visuel "planète" généré automatiquement.
//  - demo  : lien vers la version en ligne (optionnel, "" pour masquer le bouton).
//  - demoAccounts (optionnel) : comptes de test affichés sur la carte, pour
//    que les visiteurs puissent se connecter à la démo. ⚠️ Ces infos sont
//    PUBLIQUES : utilise uniquement des comptes de démo créés pour ça.
// ============================================================

const projects = [
  {
    id: 1,
    title: "CoreLab",
    description:
      "Plateforme de gestion de formations (LMS e-learning) développée avec la stack MERN",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Docker", "JWT"],
    github: "https://github.com/stevendarboux-a11y/CoreLab_v2",
    image: "",
    demo: "https://corelab-arnolddarboux.vercel.app",
    demoAccounts: [
      {
        role: "Étudiant",
        login: "clara@corelab.dev",
        password: "Student1234!",
      },
    ],
  },
  {
    id: 2,
    title: "JobAligator",
    description:
      "Job Alligator est un agrégateur d’offres d’emploi et de stage dans le domaine tech. Il récupère les annonces de WeLoveDevs, les normalise, les déduplique et les stocke dans PostgreSQL. Le site permet ensuite de rechercher les offres, de consulter leur détail, de gérer un profil, de suivre ses interactions et de calculer un score de compatibilité avec le profil utilisateur.",
    technologies: [
      "Python",
      "Vue.js",
      "Java SpringBoot",
      "PostgreSQL",
      "Docker",
      "Flyway",
    ],
    github: "https://github.com/stevendarboux-a11y/Job-aligator",
    image: "",
    demo: "",
  },
  {
    id: 3,
    title: "Connectin_V2(Java)",
    description:
      "Connect'In est un réseau social professionnel, ici se trouve la version du back-end de l'application, migré de Laravel vers Java Spring Boot.",
    technologies: ["HTML", "CSS", "JavaScript", "Jekyll"],
    github: "https://github.com/stevendarboux-a11y/V2_JAVA_Connectin",
    image: "",
    demo: "",
  },
  {
    id: 4,
    title: "Connectin",
    description:
      "Connect'In est une plateforme de réseau social moderne permettant aux utilisateurs de partager des publications, d'interagir via des commentaires et des mentions 'J'aime', et de gérer leur profil personnel. Le projet est entièrement conteneurisé avec Docker pour garantir un environnement de développement identique pour tous les collaborateurs.",
    technologies: ["HTML", "CSS", "JavaScript", "Docker", "PHP"],
    github: "https://github.com/stevendarboux-a11y/Connectin",
    image: "",
    demo: "",
  },
  {
    id: 5,
    title: "My Cinéma",
    description:
      "Application web de gestion d'un cinéma permettant d'administrer les films, les salles et les séances.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP 8.3", "MySQL"],
    github: "https://github.com/stevendarboux-a11y/My_cinema_2026",
    image: "",
    demo: "",
  },
  {
    id: 6,
    title: "Jeux Videops",
    description:
      "Pipeline CI/CD pour deux jeux JS13K : Space Invaders et SpaceWord.",
    technologies: ["HTML", "CSS", "JavaScript", "Docker", "TypeScript"],
    github: "https://github.com/stevendarboux-a11y/projet_videopps_perso",
    image: "",
    demo: "",
  },
  {
    id: 7,
    title: "CV_generator",
    description:
      "Ce projet consiste à concevoir un générateur de CV en ligne permettant à un utilisateur de créer, visualiser, modifier et exporter un CV professionnel au format PDF. L'application repose sur un projet web complet mêlant HTML, CSS, Bootstrap et JavaScript pour l'interface utilisateur, ainsi que PHP pour l'export en PDF côté serveur.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP"],
    github: "https://github.com/stevendarboux-a11y/cv_generator",
    image: "",
    demo: "",
  },
];

export default projects;
