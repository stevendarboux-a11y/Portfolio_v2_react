// ============================================================
//  APP : le "squelette" du site
//  - HashRouter : les URLs ressemblent à /#/projects. C'est le
//    routeur adapté à GitHub Pages (avec BrowserRouter, recharger
//    la page /projects donnerait une erreur 404 sur GitHub Pages).
//  - La scène 3D, la navbar et le footer restent affichés en
//    permanence ; seule la page au centre change.
// ============================================================

import { lazy, Suspense, useEffect } from "react";
import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CursorGlow from "./components/CursorGlow";
import DepthMeter from "./components/DepthMeter";
import SceneErrorBoundary from "./three/SceneErrorBoundary";
import useKeyboardNav from "./hooks/useKeyboardNav";
import { getUniverse } from "./data/universes";

// lazy() : la 3D (Three.js est une grosse librairie) est chargée à part.
// Le texte du site s'affiche immédiatement, les étoiles arrivent juste après.
const SpaceScene = lazy(() => import("./three/SpaceScene"));

// Composant séparé car useLocation() ne fonctionne qu'À L'INTÉRIEUR du routeur
function AppLayout() {
  const location = useLocation();
  const universe = getUniverse(location.pathname);
  useKeyboardNav();

  // On écrit l'univers actuel sur <html data-universe="...">.
  // Le CSS (index.css) s'en sert pour changer les couleurs du site.
  useEffect(() => {
    document.documentElement.dataset.universe = universe.key;
  }, [universe.key]);

  return (
    <>
      <SceneErrorBoundary>
        <Suspense fallback={null}>
          <SpaceScene pathname={location.pathname} />
        </Suspense>
      </SceneErrorBoundary>
      <div className="vignette" aria-hidden="true" />
      <CursorGlow />
      <DepthMeter universe={universe} />

      <Navbar />

      {/* AnimatePresence laisse l'ancienne page jouer son animation de sortie
          avant d'afficher la nouvelle (mode="wait"). La "key" change à chaque
          page : c'est ce qui indique à framer-motion qu'il y a eu un changement.
          onExitComplete : on remonte en haut une fois l'ancienne page partie. */}
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* Toute adresse inconnue renvoie vers l'accueil */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <AppLayout />
    </HashRouter>
  );
}

export default App;
