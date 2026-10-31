// ============================================================
//  HALO QUI SUIT LA SOURIS
//  Un anneau lumineux suit le curseur avec un léger retard
//  (interpolation), et grossit au-dessus des éléments cliquables.
//  Désactivé sur écran tactile (pas de souris).
// ============================================================

import { useEffect, useRef } from "react";
import styles from "./CursorGlow.module.css";

function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    // "pointer: fine" = l'appareil a une souris ou un trackpad
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const glow = glowRef.current;
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = currentX;
    let targetY = currentY;
    let frameId;

    function handlePointerMove(event) {
      targetX = event.clientX;
      targetY = event.clientY;
      glow.style.opacity = "1";
      // closest() cherche si l'élément survolé est (ou est dans) un lien/bouton
      const isInteractive = event.target.closest("a, button, input, textarea, label");
      glow.classList.toggle(styles.active, Boolean(isInteractive));
    }

    function handlePointerLeave() {
      glow.style.opacity = "0";
    }

    // Boucle d'animation : à chaque image, on parcourt 18% de la distance
    // restante vers la souris. Résultat : un mouvement fluide et "élastique".
    function animate() {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frameId = requestAnimationFrame(animate);
    }

    window.addEventListener("pointermove", handlePointerMove);
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <div ref={glowRef} className={styles.glow} aria-hidden="true" />;
}

export default CursorGlow;
