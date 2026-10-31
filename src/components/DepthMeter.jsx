// ============================================================
//  COMPTEUR DE PROFONDEUR
//  Petit instrument de bord en bas de l'écran : il affiche
//  l'univers traversé et la profondeur atteinte selon le scroll.
//  Pour la fluidité, le texte et la jauge sont mis à jour
//  directement dans le DOM (via des refs) à chaque image,
//  sans passer par un state React qui re-rendrait le composant.
// ============================================================

import { useEffect, useRef } from "react";
import { DEPTH_PER_PIXEL } from "../data/universes";
import styles from "./DepthMeter.module.css";

// 1 unité 3D = 1 000 années-lumière (pure fantaisie, pour l'ambiance !)
const LIGHT_YEARS_PER_UNIT = 1000;

function DepthMeter({ universe }) {
  const valueRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    let frameId;

    function update() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const depth = Math.round(window.scrollY * DEPTH_PER_PIXEL * LIGHT_YEARS_PER_UNIT);

      // toLocaleString("fr-FR") ajoute les espaces : 12 400
      valueRef.current.textContent = `${depth.toLocaleString("fr-FR")} al`;
      barRef.current.style.transform = `scaleY(${progress})`;
      frameId = requestAnimationFrame(update);
    }

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className={styles.meter} aria-hidden="true">
      <div className={styles.track}>
        <span ref={barRef} className={styles.bar} />
      </div>
      <div className={styles.info}>
        <span className={styles.label}>Univers</span>
        {/* key : le nom est "recréé" à chaque univers, ce qui rejoue son animation */}
        <span key={universe.key} className={styles.name}>
          {universe.name}
        </span>
        <span className={styles.label}>Profondeur</span>
        <span ref={valueRef} className={styles.value}>
          0 al
        </span>
      </div>
    </div>
  );
}

export default DepthMeter;
