// ============================================================
//  ENVELOPPE D'UN ASTRE PRINCIPAL
//  Chaque univers a un astre principal (planète, cristal, soleil,
//  trou noir). Ce composant gère ce qu'ils ont en commun :
//  - sa position à l'écran (différente sur ordinateur et mobile),
//  - son arrivée depuis les profondeurs quand on entre dans l'univers,
//    et son départ quand on le quitte,
//  - son inclinaison vers la souris.
//  L'astre lui-même est passé en "children".
// ============================================================

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { clampDelta, damp, proximityFactor, usePresence } from "./utils";

// Distance d'où l'astre arrive (et où il repart) quand on change d'univers
const ARRIVAL_DEPTH = 60;

function UniverseBody({ active, layout, children }) {
  const groupRef = useRef();
  const presenceRef = usePresence(active);

  const isMobile = useThree((state) => state.size.width < 768);
  const { position, scale } = isMobile ? layout.mobile : layout.desktop;

  useFrame((state, delta) => {
    const dt = clampDelta(delta);
    const group = groupRef.current;
    const presence = presenceRef.current;

    // Complètement parti : on ne le dessine plus (économise la carte graphique)
    group.visible = presence > 0.002;
    if (!group.visible) return;

    // Plus "presence" est faible, plus l'astre est loin et petit
    const [x, y, z] = position;
    group.position.set(x, y, z - (1 - presence) * ARRIVAL_DEPTH);
    // ...et il rétrécit si la caméra le frôle pendant le voyage
    group.scale.setScalar(scale * presence * proximityFactor(state.camera, group.position.z));

    // Inclinaison vers la souris (state.pointer va de -1 à 1)
    group.rotation.x = damp(group.rotation.x, -state.pointer.y * 0.25, 3, dt);
    group.rotation.y = damp(group.rotation.y, state.pointer.x * 0.35, 3, dt);
  });

  return (
    <group ref={groupRef} visible={false}>
      {children}
    </group>
  );
}

export default UniverseBody;
