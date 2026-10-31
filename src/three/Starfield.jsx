// ============================================================
//  CHAMP D'ÉTOILES
//  Les étoiles avancent vers la caméra :
//  - doucement en permanence (dérive),
//  - beaucoup pendant le saut en hyperespace (changement de page),
//  - au rythme du scroll : scroller vers le bas = avancer,
//    remonter = reculer.
//  Le champ "suit" la caméra, et chaque étoile qui sort par
//  l'avant réapparaît au fond (ou l'inverse) : il est infini.
// ============================================================

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { STAR_TEXTURE } from "./textures";
import { clampDelta, prefersReducedMotion } from "./utils";

const STAR_COUNT = 4000;
// Le volume des étoiles, relatif à la caméra (z négatif = devant)
const FIELD = { width: 70, height: 45, near: 2, far: -78 };
const FIELD_DEPTH = FIELD.near - FIELD.far;
// Les étoiles défilent un peu plus vite que le reste : accentue la vitesse
const TRAVEL_FACTOR = 1.4;

// Modulo qui fonctionne aussi avec les nombres négatifs (en JS, -1 % 5 = -1)
const wrap = (value, max) => ((value % max) + max) % max;

// Positions et couleurs aléatoires, calculées une seule fois au chargement.
// Float32Array = tableau de nombres optimisé, le format attendu par la carte graphique.
function createStars() {
  const positions = new Float32Array(STAR_COUNT * 3); // x, y, z par étoile
  const colors = new Float32Array(STAR_COUNT * 3); // r, g, b par étoile
  const baseDepths = new Float32Array(STAR_COUNT); // profondeur de départ de chaque étoile
  // Couleurs de base presque blanches : la teinte de l'univers s'y ajoute
  const palette = ["#ffffff", "#e5e4e2", "#d6dcff", "#c9b8ff", "#c4f4ff"].map(
    (hex) => new THREE.Color(hex),
  );

  for (let i = 0; i < STAR_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * FIELD.width;
    positions[i * 3 + 1] = (Math.random() - 0.5) * FIELD.height;
    baseDepths[i] = Math.random() * FIELD_DEPTH;

    const color = palette[Math.floor(Math.random() * palette.length)];
    colors.set([color.r, color.g, color.b], i * 3);
  }
  return { positions, colors, baseDepths };
}

const STARS = createStars();

function Starfield({ universe, warpRef, travelRef }) {
  const pointsRef = useRef();
  const materialRef = useRef();
  const driftRef = useRef(0); // distance parcourue "toute seule" depuis le chargement
  const tint = useMemo(() => new THREE.Color(), []);

  // useFrame s'exécute à CHAQUE image (~60 fois par seconde)
  useFrame((state, delta) => {
    const dt = clampDelta(delta);
    const baseSpeed = prefersReducedMotion ? 0.3 : 1.2;
    driftRef.current += (baseSpeed + warpRef.current * 80) * dt;

    // Décalage total = dérive + distance parcourue grâce au scroll
    const offset = driftRef.current + travelRef.current * TRAVEL_FACTOR;

    const attribute = pointsRef.current.geometry.attributes.position;
    const array = attribute.array;
    for (let i = 0; i < STAR_COUNT; i++) {
      // wrap() garde chaque étoile dans le volume : on boucle à l'infini
      array[i * 3 + 2] = FIELD.far + wrap(STARS.baseDepths[i] + offset, FIELD_DEPTH);
    }
    attribute.needsUpdate = true; // prévient Three.js que les positions ont changé

    // Le champ d'étoiles accompagne la caméra dans son voyage
    pointsRef.current.position.z = state.camera.position.z;
    pointsRef.current.rotation.z += dt * 0.01;

    // Fondu vers la teinte de l'univers actuel
    tint.set(universe.starTint);
    materialRef.current.color.lerp(tint, 1 - Math.exp(-2 * dt));
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[STARS.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[STARS.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.2}
        map={STAR_TEXTURE}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export default Starfield;
