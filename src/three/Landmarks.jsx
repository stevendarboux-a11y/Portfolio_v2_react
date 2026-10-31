// ============================================================
//  REPÈRES DU VOYAGE
//  Des objets placés de plus en plus loin dans la profondeur :
//  en scrollant, la caméra avance et passe à côté d'eux
//  (ou au travers, pour les portails du Contact).
//  Chaque univers a ses propres repères.
// ============================================================

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import universes from "../data/universes";
import { GLOW_TEXTURE } from "./textures";
import { clampDelta, proximityFactor, usePresence } from "./utils";

// Position [x, y, z] de chaque repère ; z négatif = plus loin
const LANDMARKS = {
  home: [
    { type: "moon", position: [-7, 2.5, -12], scale: 0.8 },
    { type: "moon", position: [7.5, -3, -24], scale: 1.2 },
    { type: "moon", position: [-8, -3.5, -38], scale: 1 },
    { type: "moon", position: [7, 4, -52], scale: 1.5 },
  ],
  projects: [
    { type: "shard", position: [-7, 3, -16], scale: 1 },
    { type: "shard", position: [8, -3.5, -26], scale: 1.3 },
    { type: "shard", position: [-7.5, -4, -36], scale: 0.8 },
    { type: "shard", position: [7, 3.5, -46], scale: 1.1 },
    { type: "shard", position: [-8, 1, -58], scale: 1.5 },
    { type: "shard", position: [6, -4.5, -68], scale: 1 },
  ],
  about: [
    { type: "ember", position: [-7, 2.5, -14], scale: 1 },
    { type: "ember", position: [8, -2.5, -26], scale: 1.4 },
    { type: "ember", position: [-7, -3.5, -38], scale: 0.9 },
    { type: "ember", position: [7, 3.5, -50], scale: 1.2 },
    { type: "ember", position: [-5, 4, -62], scale: 1 },
  ],
  contact: [
    // Portails centrés sur le trajet : la caméra passe au travers
    { type: "portal", position: [0, 0, -14], scale: 6 },
    { type: "portal", position: [0, 0, -28], scale: 6.5 },
    { type: "portal", position: [0, 0, -42], scale: 7 },
    { type: "portal", position: [0, 0, -56], scale: 7.5 },
  ],
};

/* ---------- Les 4 formes de repères ---------- */

function MoonShape({ accent }) {
  return (
    <>
      <mesh>
        <sphereGeometry args={[0.5, 48, 48]} />
        <meshStandardMaterial color="#d8dae0" metalness={1} roughness={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[0.85, 0.01, 8, 128]} />
        <meshBasicMaterial color={accent} transparent opacity={0.6} />
      </mesh>
    </>
  );
}

function ShardShape({ accent, accent2 }) {
  return (
    <>
      <mesh scale={[0.5, 0.9, 0.5]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={accent} metalness={0.9} roughness={0.15} flatShading />
      </mesh>
      <mesh scale={[0.8, 1.3, 0.8]}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color={accent2} wireframe transparent opacity={0.3} />
      </mesh>
    </>
  );
}

function EmberShape({ accent, accent2 }) {
  return (
    <>
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial color={accent2} toneMapped={false} />
      </mesh>
      <sprite scale={3}>
        <spriteMaterial
          map={GLOW_TEXTURE}
          color={accent}
          transparent
          opacity={0.7}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </>
  );
}

function PortalShape({ accent, accent2 }) {
  return (
    <>
      <mesh>
        <torusGeometry args={[1, 0.012, 12, 160]} />
        <meshBasicMaterial color={accent} transparent opacity={0.35} toneMapped={false} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 4]} scale={1.08}>
        <torusGeometry args={[1, 0.004, 8, 6]} /> {/* 6 segments = hexagone */}
        <meshBasicMaterial color={accent2} transparent opacity={0.2} />
      </mesh>
    </>
  );
}

const SHAPES = { moon: MoonShape, shard: ShardShape, ember: EmberShape, portal: PortalShape };

/* ---------- Un repère : apparition + rotation ---------- */

function Landmark({ type, position, scale, active, universe }) {
  const groupRef = useRef();
  const presenceRef = usePresence(active, 1.8);
  const Shape = SHAPES[type];

  useFrame((state, delta) => {
    const dt = clampDelta(delta);
    const group = groupRef.current;
    const presence = presenceRef.current;
    group.visible = presence > 0.002;
    if (!group.visible) return;

    // Les portails, eux, gardent leur taille : on doit passer AU TRAVERS
    const proximity = type === "portal" ? 1 : proximityFactor(state.camera, position[2]);
    group.scale.setScalar(scale * presence * proximity);
    if (type === "portal") {
      group.rotation.z += dt * 0.15; // un portail tourne face à nous
    } else {
      group.rotation.y += dt * 0.3;
      group.rotation.x += dt * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} visible={false}>
      <Shape accent={universe.accent} accent2={universe.accent2} />
    </group>
  );
}

function Landmarks({ activeKey }) {
  // On affiche les repères de TOUS les univers ; seuls ceux de l'univers
  // actif sont "présents", les autres se réduisent à rien.
  return universes.map((universe) =>
    LANDMARKS[universe.key].map((landmark, index) => (
      <Landmark
        key={`${universe.key}-${index}`}
        {...landmark}
        universe={universe}
        active={universe.key === activeKey}
      />
    )),
  );
}

export default Landmarks;
