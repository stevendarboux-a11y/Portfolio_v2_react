// ============================================================
//  À PROPOS — "Système Ambre"
//  Une étoile incandescente dont la surface bouillonne, avec sa
//  couronne lumineuse et ses planètes en orbite.
// ============================================================

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import UniverseBody from "../UniverseBody";
import Moon from "../Moon";
import { GLOW_TEXTURE } from "../textures";
import { clampDelta } from "../utils";

const LAYOUT = {
  desktop: { position: [6, 2.6, -9], scale: 1.3 },
  mobile: { position: [1.2, 4, -13], scale: 1.3 },
};

function AmberStar({ active }) {
  const coreRef = useRef();
  const coronaRef = useRef();

  useFrame((state, delta) => {
    coreRef.current.rotation.y += clampDelta(delta) * 0.1;
    // La couronne "respire" : sa taille oscille avec une sinusoïde
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.06;
    coronaRef.current.scale.setScalar(5.5 * pulse);
  });

  return (
    <UniverseBody active={active} layout={LAYOUT}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* "emissive" = le matériau produit sa propre lumière.
            toneMapped={false} le laisse très lumineux, presque éblouissant. */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[1, 96, 96]} />
          <MeshDistortMaterial
            color="#ffb347"
            emissive="#ff7a1a"
            emissiveIntensity={1.6}
            roughness={0.7}
            distort={0.3}
            speed={2}
            toneMapped={false}
          />
        </mesh>

        {/* Couronne : deux halos superposés, orange puis rouge plus large */}
        <sprite ref={coronaRef} scale={5.5}>
          <spriteMaterial
            map={GLOW_TEXTURE}
            color="#ff9a3d"
            transparent
            opacity={0.65}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
        <sprite scale={10}>
          <spriteMaterial
            map={GLOW_TEXTURE}
            color="#ff4d1a"
            transparent
            opacity={0.22}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>

        <mesh rotation={[Math.PI / 2.2, 0, 0.2]}>
          <torusGeometry args={[2, 0.01, 16, 200]} />
          <meshBasicMaterial color="#ffd98a" transparent opacity={0.5} />
        </mesh>

        <Moon radius={2.6} speed={0.4} size={0.16} tilt={0.3} color="#c97a4a" />
        <Moon radius={3.4} speed={-0.25} size={0.1} tilt={-0.5} />
      </Float>
    </UniverseBody>
  );
}

export default AmberStar;
