# 🛰️ Portfolio V2 — Darboux Arnold

> Portfolio immersif en 3D, développé avec **React** et **Three.js**.
> Chaque page est un univers différent : plus on fait défiler, plus on voyage dans l'espace.

🔗 **Site en ligne :** https://stevendarboux-a11y.github.io/Portfolio_v2_react/

Développeur web full stack en formation à **Epitech**, je recherche une **alternance à partir de décembre 2026** (Lille / Paris).

---

## ✨ Fonctionnalités

- **Scène 3D en temps réel** (Three.js via React Three Fiber) affichée derrière tout le site
- **Voyage au scroll** : la caméra avance dans l'espace quand on descend et recule quand on remonte, avec un compteur de profondeur en années-lumière
- **4 univers**, un par page, chacun avec ses couleurs et son astre principal :

  | Page     | Univers              | Astre principal          |
  | -------- | -------------------- | ------------------------ |
  | Accueil  | Nébuleuse Platine    | Planète métallique       |
  | Projets  | Constellation Aurora | Cristal et astéroïdes    |
  | À propos | Système Ambre        | Étoile incandescente     |
  | Contact  | Horizon Magenta      | Trou noir                |

- **Saut en hyperespace** et fondu des couleurs à chaque changement de page
- **Cartes projets interactives** : inclinaison 3D au survol, filtres par technologie, accès de démo copiables en un clic
- **Navigation au clavier** : touches `1` à `4` pour changer de page
- **Formulaire de contact** avec validation
- **Responsive** (mobile, tablette, desktop)
- **Accessibilité** : respect du réglage « réduire les animations », navigation clavier visible, fond de secours si WebGL n'est pas disponible

---

## 🧰 Technologies

| Domaine     | Outils                                                   |
| ----------- | -------------------------------------------------------- |
| Framework   | React 19, Vite                                           |
| 3D          | Three.js, @react-three/fiber, @react-three/drei          |
| Animations  | Framer Motion                                            |
| Navigation  | React Router (HashRouter, compatible GitHub Pages)       |
| Style       | CSS Modules, variables CSS animées (`@property`)         |
| Qualité     | ESLint (règles React Hooks)                              |

---

## 🚀 Lancer le projet en local

**Prérequis :** Node.js 20 ou plus récent.

```bash
# 1. Cloner le dépôt
git clone https://github.com/stevendarboux-a11y/Portfolio_v2_react.git
cd Portfolio_v2_react

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev
```

Le site est alors disponible sur http://localhost:5173/Portfolio_v2_react/

| Commande          | Rôle                                           |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Serveur de développement avec rechargement auto |
| `npm run build`   | Version de production dans `dist/`              |
| `npm run preview` | Prévisualise la version de production          |
| `npm run lint`    | Vérifie la qualité du code                     |

---

## 🗂️ Structure du projet

```
src/
├── data/         Contenu du site (profil, projets, pages, couleurs des univers)
├── pages/        Les 4 pages : Accueil, Projets, À propos, Contact
├── components/   Composants réutilisables (navbar, cartes projets, transitions…)
├── hooks/        Hooks personnalisés (navigation clavier, effet d'inclinaison)
└── three/        Toute la scène 3D (caméra, étoiles, nébuleuses, astres)
```

Le contenu est séparé de l'affichage : pour modifier un texte ou ajouter un projet, il suffit d'éditer les fichiers de `src/data/`, sans toucher aux composants.

---

## 🧠 Ce que ce projet m'a appris

- Structurer une application React en composants, pages et hooks personnalisés
- Gérer la navigation entre pages avec React Router
- Afficher et animer une scène 3D avec Three.js dans React
- Synchroniser le scroll, la caméra 3D et les couleurs de l'interface
- Optimiser le rendu 3D (instancing, chargement différé, limitation de la résolution)
- Penser l'accessibilité dès la conception

---

## 📬 Contact

- **Email :** stevendarboux@gmail.com
- **LinkedIn :** [linkedin.com/in/arnold-darboux](https://linkedin.com/in/arnold-darboux)
- **GitHub :** [stevendarboux-a11y](https://github.com/stevendarboux-a11y)
