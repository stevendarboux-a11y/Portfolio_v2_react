// ============================================================
//  CONTACT — "Horizon Magenta"
//  Un trou noir : une sphère parfaitement noire, entourée d'un
//  disque de matière incandescente qui tourbillonne.
// ============================================================

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import UniverseBody from "../UniverseBody";
import { DISK_TEXTURE, GLOW_TEXTURE } from "../textures";
import { clampDelta, prefersReducedMotion } from "../utils";

const LAYOUT = {
  desktop: { position: [6, 2.4, -11], scale: 1.6 },
  mobile: { position: [0.5, 4, -14], scale: 1.4 },
};

function BlackHole({ active }) {
  const diskRef = useRef();

  useFrame((_, delta) => {
    // Le disque tourne sur lui-même (dans son propre plan)
    diskRef.current.rotation.z -= clampDelta(delta) * (prefersReducedMotion ? 0.1 : 0.5);
  });

  return (
    <UniverseBody active={active} layout={LAYOUT}>
      <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.4}>
        {/* Lueur diffuse derrière le trou noir */}
        <sprite scale={8} position={[0, 0, -1]}>
          <spriteMaterial
            map={GLOW_TEXTURE}
            color="#d13f9b"
            transparent
            opacity={0.45}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>

        {/* Le disque d'accrétion, incliné pour qu'on le voie en perspective */}
        <group rotation={[1.25, 0, 0.35]}>
          <mesh ref={diskRef}>
            <ringGeometry args={[0.9, 3.4, 128]} />
            <meshBasicMaterial
              map={DISK_TEXTURE}
              transparent
              side={THREE.DoubleSide}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
            />
          </mesh>
        </group>

        {/* L'horizon : une sphère noire qui "avale" la lumière */}
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Anneau de photons : fin cercle très lumineux autour de l'horizon */}
        <mesh>
          <torusGeometry args={[1.06, 0.02, 16, 200]} />
          <meshBasicMaterial color="#ffc2ef" toneMapped={false} />
        </mesh>
      </Float>
    </UniverseBody>
  );
}

export default BlackHole;
