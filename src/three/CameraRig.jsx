// ============================================================
//  CAMÉRA : le "vaisseau" du visiteur
//  - Le scroll fait avancer la caméra dans la profondeur (axe z).
//    Remonter la page la fait reculer : le voyage est réversible.
//  - Le trajet ondule légèrement (sinus) pour ne pas être rectiligne.
//  - La souris ajoute un léger décalage (parallaxe).
//  - Après un changement de page, le "warp" élargit le champ de
//    vision : sensation de saut en hyperespace.
// ============================================================

import { useFrame } from "@react-three/fiber";
import { DEPTH_PER_PIXEL } from "../data/universes";
import { clampDelta, damp, prefersReducedMotion } from "./utils";

const START_Z = 8; // position de départ de la caméra

function CameraRig({ warpRef, travelRef }) {
  useFrame((state, delta) => {
    const dt = clampDelta(delta);
    const { camera, pointer } = state;

    // Le "warp" retombe progressivement vers 0 après un changement de page
    warpRef.current = damp(warpRef.current, 0, 1.6, dt);

    // Distance de voyage visée = nombre de pixels défilés × facteur
    const targetTravel = window.scrollY * DEPTH_PER_PIXEL;
    // En temps normal on la suit avec un peu d'inertie (effet "vaisseau").
    // Pendant le saut en hyperespace, on la suit instantanément : le retour
    // en haut de la nouvelle page passe ainsi inaperçu.
    travelRef.current =
      warpRef.current > 0.3 ? targetTravel : damp(travelRef.current, targetTravel, 3, dt);
    const travel = travelRef.current;

    // Trajectoire ondulée
    const pathX = Math.sin(travel * 0.08) * 1.2;
    const pathY = Math.sin(travel * 0.05) * 0.6;

    camera.position.x = damp(camera.position.x, pathX + pointer.x * 0.8, 2, dt);
    camera.position.y = damp(camera.position.y, pathY + pointer.y * 0.5, 2, dt);
    camera.position.z = START_Z - travel;

    camera.fov = 55 + warpRef.current * (prefersReducedMotion ? 0 : 30);
    camera.updateProjectionMatrix();
    // On regarde toujours droit devant, un peu plus loin sur le trajet
    camera.lookAt(pathX * 0.5, pathY * 0.5, camera.position.z - 12);
  });

  return null; // ce composant n'affiche rien, il ne fait qu'animer la caméra
}

export default CameraRig;
