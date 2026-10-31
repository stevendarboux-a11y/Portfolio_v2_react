// ============================================================
//  OUTILS PARTAGÉS PAR LA SCÈNE 3D
// ============================================================

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Respecte le réglage "réduire les animations" du système
export const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// THREE.MathUtils.damp rapproche doucement une valeur de sa cible
// à chaque image (comme un ressort amorti).
export const { damp } = THREE.MathUtils;

// Limite le temps écoulé entre deux images : évite un "saut" quand
// on revient sur l'onglet après l'avoir laissé en arrière-plan.
export const clampDelta = (delta) => Math.min(delta, 0.1);

// ------------------------------------------------------------
// HOOK usePresence
// Renvoie une valeur (dans un ref) qui glisse doucement vers 1 quand
// "active" est vrai, et vers 0 sinon. On s'en sert pour faire apparaître
// l'univers de la page actuelle et disparaître les autres.
// ------------------------------------------------------------
export function usePresence(active, speed = 2.4) {
  const presenceRef = useRef(0); // 0 au départ : tout "arrive" au chargement

  useFrame((_, delta) => {
    presenceRef.current = damp(presenceRef.current, active ? 1 : 0, speed, clampDelta(delta));
  });

  return presenceRef;
}

// ------------------------------------------------------------
// Rétrécit un objet quand la caméra arrive presque dessus, pour qu'il
// ne remplisse pas tout l'écran en passant (et ne cache pas le texte).
// Renvoie 1 quand l'objet est loin, 0 quand la caméra le touche.
// ------------------------------------------------------------
export function proximityFactor(camera, objectZ, fadeStart = 5, fadeEnd = 1.5) {
  const distance = camera.position.z - objectZ; // > 0 : l'objet est devant nous
  return THREE.MathUtils.clamp((distance - fadeEnd) / (fadeStart - fadeEnd), 0, 1);
}
