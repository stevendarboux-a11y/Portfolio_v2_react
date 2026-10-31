// ============================================================
//  HOOK PERSONNALISÉ : effet d'inclinaison 3D au survol
//  Calcule où se trouve la souris sur l'élément et l'écrit dans
//  des variables CSS (--rx, --ry, --mx, --my). Le CSS fait le reste.
//  On modifie le style directement (sans useState) pour éviter
//  de re-rendre le composant à chaque mouvement de souris.
// ============================================================

import { useRef } from "react";

function useTilt(maxTilt = 8) {
  const ref = useRef(null);

  function handleMouseMove(event) {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    // Position de la souris dans l'élément, entre 0 et 1
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    element.style.setProperty("--ry", `${(x - 0.5) * maxTilt * 2}deg`);
    element.style.setProperty("--rx", `${(0.5 - y) * maxTilt * 2}deg`);
    element.style.setProperty("--mx", `${x * 100}%`);
    element.style.setProperty("--my", `${y * 100}%`);
  }

  function handleMouseLeave() {
    const element = ref.current;
    if (!element) return;
    element.style.setProperty("--rx", "0deg");
    element.style.setProperty("--ry", "0deg");
  }

  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
}

export default useTilt;
