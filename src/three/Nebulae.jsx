// ============================================================
//  NÉBULEUSES
//  De grands halos colorés très loin derrière. Ils suivent la
//  caméra (on ne les atteint jamais, comme un horizon) et leurs
//  couleurs glissent vers celles de l'univers actuel.
// ============================================================

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GLOW_TEXTURE } from "./textures";
import { clampDelta } from "./utils";

// Positions relatives à la caméra
const NEBULAE = [
  { position: [-16, 7, -53], scale: 50, opacity: 0.35 },
  { position: [18, -9, -58], scale: 55, opacity: 0.3 },
  { position: [4, 12, -68], scale: 45, opacity: 0.22 },
  { position: [-8, -14, -48], scale: 35, opacity: 0.18 },
];

function Nebulae({ universe }) {
  const groupRef = useRef();
  const materialsRef = useRef([]);
  const target = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    const dt = clampDelta(delta);
    groupRef.current.position.z = state.camera.position.z;
    groupRef.current.rotation.z += dt * 0.004;

    materialsRef.current.forEach((material, index) => {
      target.set(universe.nebulae[index]);
      material.color.lerp(target, 1 - Math.exp(-1.5 * dt));
    });
  });

  return (
    <group ref={groupRef}>
      {NEBULAE.map((nebula, index) => (
        // Un "sprite" est une image plate toujours tournée vers la caméra
        <sprite key={index} position={nebula.position} scale={[nebula.scale, nebula.scale, 1]}>
          <spriteMaterial
            // Ref "fonction" : on range chaque matériau dans un tableau
            ref={(material) => {
              materialsRef.current[index] = material;
            }}
            map={GLOW_TEXTURE}
            color={universe.nebulae[index]}
            transparent
            opacity={nebula.opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            fog={false} // le brouillard ne doit pas effacer l'horizon
          />
        </sprite>
      ))}
    </group>
  );
}

export default Nebulae;
