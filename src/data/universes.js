// ============================================================
//  LES UNIVERS
//  Chaque page du site est un univers différent. Ce fichier
//  décrit leurs couleurs ; il est utilisé à la fois par :
//  - la scène 3D (fond, étoiles, nébuleuses, lumières),
//  - le CSS (boutons, liens, bordures : voir index.css),
//  - le compteur de profondeur (nom de l'univers).
// ============================================================

const universes = [
  {
    path: "/",
    key: "home", // utilisé dans le CSS : [data-universe="home"]
    name: "Nébuleuse Platine",
    background: "#03040a",
    accent: "#8f7cff", // violet
    accent2: "#6fe3ff", // cyan
    starTint: "#ffffff", // teinte appliquée à toutes les étoiles
    nebulae: ["#5b3fd1", "#1d6fa3", "#8f7cff", "#2bb3c9"],
  },
  {
    path: "/projects",
    key: "projects",
    name: "Constellation Aurora",
    background: "#020a0a",
    accent: "#3dffb0", // émeraude
    accent2: "#5ce1ff", // turquoise
    starTint: "#c8fff0",
    nebulae: ["#0f7a5c", "#0d5c7a", "#1fbf8f", "#2b6fc9"],
  },
  {
    path: "/about",
    key: "about",
    name: "Système Ambre",
    background: "#0a0603",
    accent: "#ff9a3d", // orange
    accent2: "#ffd98a", // or
    starTint: "#ffe2c0",
    nebulae: ["#a3471d", "#7a2d0d", "#d98a2b", "#5c1f3a"],
  },
  {
    path: "/contact",
    key: "contact",
    name: "Horizon Magenta",
    background: "#08030a",
    accent: "#ff5ccf", // magenta
    accent2: "#b78cff", // lavande
    starTint: "#ffd0f0",
    nebulae: ["#8a1d6e", "#4a1d8a", "#d13f9b", "#2b1f6e"],
  },
];

// Retrouve l'univers d'une page (l'accueil par défaut)
export function getUniverse(pathname) {
  return universes.find((universe) => universe.path === pathname) ?? universes[0];
}

// Distance parcourue dans l'espace pour chaque pixel défilé.
// Augmente ce nombre pour voyager plus vite quand on scrolle.
export const DEPTH_PER_PIXEL = 0.012;

export default universes;
