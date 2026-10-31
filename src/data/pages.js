// ============================================================
//  LISTE DES PAGES DU SITE
//  Une seule source de vérité utilisée par : la Navbar, les cartes
//  "Prochaines destinations" en bas de chaque page et les raccourcis
//  clavier (touches 1 à 4). Ajouter une page ici l'ajoute partout.
// ============================================================

const pages = [
  {
    path: "/",
    label: "Accueil",
    code: "01",
    shortcut: "1",
    description: "Retour au point de départ de l'exploration.",
  },
  {
    path: "/projects",
    label: "Projets",
    code: "02",
    shortcut: "2",
    description: "Les applications que j'ai conçues et développées.",
  },
  {
    path: "/about",
    label: "À propos",
    code: "03",
    shortcut: "3",
    description: "Mon parcours, mes compétences et mon CV.",
  },
  {
    path: "/contact",
    label: "Contact",
    code: "04",
    shortcut: "4",
    description: "Ouvrons un canal de communication.",
  },
];

export default pages;
