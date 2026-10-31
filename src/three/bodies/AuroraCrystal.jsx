// ============================================================
//  PROJETS — "Constellation Aurora"
//  Un cristal émeraude à facettes, entouré d'une cage en fil de
//  fer et d'une ceinture d'astéroïdes.
// ============================================================

import { useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import UniverseBody from "../UniverseBody";
import { GLOW_TEXTURE } from "../textures";
import { clampDelta, prefersReducedMotion } from "../utils";

const LAYOUT = {
  desktop: { position: [5.5, 2.4, -8], scale: 1.4 },
  mobile: { position: [1.2, 4, -12], scale: 1.4 },
};

// Positions aléatoires des astéroïdes, calculées une seule fois
const ROCK_COUNT = 90;
const ROCKS = Array.from({ length: ROCK_COUNT }, (_, i) => {
  const angle = (i / ROCK_COUNT) * Math.PI * 2;
  const radius = 2.2 + Math.random() * 0.7;
  return {
    position: [Math.cos(angle) * radius, (Math.random() - 0.5) * 0.3, Math.sin(angle) * radius],
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
    scale: 0.5 + Math.random() * 1.2,
  };
});

// "instancedMesh" dessine 90 astéroïdes en UN SEUL appel à la carte
// graphique (au lieu de 90) : c'est beaucoup plus performant.
function AsteroidBelt() {
  const meshRef = useRef();

  // On place chaque instance une fois, juste après l'affichage
  useLayoutEffect(() => {
    const dummy = new THREE.Object3D(); // objet "brouillon" pour calculer les matrices
    ROCKS.forEach((rock, index) => {
      dummy.position.set(...rock.position);
      dummy.rotation.set(...rock.rotation);
      dummy.scale.setScalar(rock.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, ROCK_COUNT]}>
      <tetrahedronGeometry args={[0.07, 0]} />
      <meshStandardMaterial color="#9fffe0" metalness={0.8} roughness={0.3} flatShading />
    </instancedMesh>
  );
}

function AuroraCrystal({ active }) {
  const crystalRef = useRef();
  const cageRef = useRef();
  const beltRef = useRef();

  useFrame((_, delta) => {
    const dt = clampDelta(delta) * (prefersReducedMotion ? 0.25 : 1);
    crystalRef.current.rotation.y += dt * 0.3;
    cageRef.current.rotation.y -= dt * 0.12;
    cageRef.current.rotation.z += dt * 0.05;
    beltRef.current.rotation.y += dt * 0.15;
  });

  return (
    <UniverseBody active={active} layout={LAYOUT}>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
        {/* Halo émeraude derrière le cristal */}
        <sprite scale={5} position={[0, 0, -0.5]}>
          <spriteMaterial
            map={GLOW_TEXTURE}
            color="#3dffb0"
            transparent
            opacity={0.35}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>

        {/* Le cristal : octaèdre étiré, "flatShading" = facettes bien nettes */}
        <mesh ref={crystalRef} scale={[0.9, 1.4, 0.9]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#7dffd0" metalness={0.9} roughness={0.12} flatShading />
        </mesh>

        <mesh ref={cageRef} scale={1.9}>
          <octahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#5ce1ff" wireframe transparent opacity={0.25} />
        </mesh>

        <group ref={beltRef} rotation={[0.45, 0, 0.2]}>
          <AsteroidBelt />
        </group>
      </Float>
    </UniverseBody>
  );
}

export default AuroraCrystal;
