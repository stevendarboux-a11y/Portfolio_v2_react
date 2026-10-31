// ============================================================
//  ACCUEIL — "Nébuleuse Platine"
//  Une planète en métal liquide, ses anneaux, ses lunes et une
//  cage géométrique façon hologramme.
// ============================================================

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import UniverseBody from "../UniverseBody";
import Moon from "../Moon";
import { clampDelta, damp, prefersReducedMotion } from "../utils";

const LAYOUT = {
  desktop: { position: [2.9, 0, 0], scale: 1.55 },
  mobile: { position: [0, 3.6, -5], scale: 1.55 },
};

function PlatinumPlanet({ active }) {
  const coreRef = useRef();
  const materialRef = useRef();
  const shellRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    const dt = clampDelta(delta);
    const spin = prefersReducedMotion ? 0.03 : 0.12;
    coreRef.current.rotation.y += dt * spin;
    shellRef.current.rotation.x -= dt * spin * 0.4;
    shellRef.current.rotation.y += dt * spin * 0.6;

    // Au survol, la surface "liquide" s'agite davantage
    materialRef.current.distort = damp(materialRef.current.distort, hovered ? 0.5 : 0.22, 4, dt);
  });

  return (
    <UniverseBody active={active} layout={LAYOUT}>
      {/* Float = léger mouvement de flottaison automatique */}
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh
          ref={coreRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[1, 128, 128]} />
          <MeshDistortMaterial
            ref={materialRef}
            color="#d8dae0"
            metalness={1}
            roughness={0.28}
            distort={0.22}
            speed={1.6}
          />
        </mesh>

        {/* Atmosphère : sphère plus grande, vue de l'intérieur (BackSide) */}
        <mesh scale={1.2}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial
            color="#8f7cff"
            transparent
            opacity={0.1}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Anneaux fins (torus très plats) */}
        <mesh rotation={[Math.PI / 2.3, 0, 0.3]}>
          <torusGeometry args={[1.75, 0.012, 16, 256]} />
          <meshBasicMaterial color="#8fe9ff" transparent opacity={0.75} />
        </mesh>
        <mesh rotation={[Math.PI / 1.8, 0.4, 0]}>
          <torusGeometry args={[2.15, 0.006, 16, 256]} />
          <meshBasicMaterial color="#e5e4e2" transparent opacity={0.45} />
        </mesh>

        {/* Cage géométrique en fil de fer */}
        <mesh ref={shellRef}>
          <icosahedronGeometry args={[2.7, 1]} />
          <meshBasicMaterial color="#8f7cff" wireframe transparent opacity={0.12} />
        </mesh>

        <Moon radius={2.15} speed={0.5} size={0.09} tilt={0.4} />
        <Moon radius={2.9} speed={-0.3} size={0.06} tilt={-0.6} />
      </Float>
    </UniverseBody>
  );
}

export default PlatinumPlanet;
