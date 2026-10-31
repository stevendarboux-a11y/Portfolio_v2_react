// ============================================================
//  ATMOSPHÈRE : couleur du fond, brouillard et lumières
//  Tout glisse en douceur vers les couleurs de l'univers actuel.
//  Le brouillard (fog) fait émerger les objets lointains de
//  l'obscurité au fur et à mesure qu'on avance.
// ============================================================

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { clampDelta } from "./utils";

function Atmosphere({ universe }) {
  const scene = useThree((state) => state.scene);
  const accentLightRef = useRef();
  const backgroundColor = useMemo(() => new THREE.Color(), []);
  const accentColor = useMemo(() => new THREE.Color(), []);

  useFrame((_, delta) => {
    const speed = 1 - Math.exp(-2 * clampDelta(delta));

    backgroundColor.set(universe.background);
    scene.background.lerp(backgroundColor, speed);
    scene.fog.color.copy(scene.background);

    accentColor.set(universe.accent);
    accentLightRef.current.color.lerp(accentColor, speed);
  });

  return (
    <>
      <color attach="background" args={[universe.background]} />
      {/* Brouillard : invisible avant 18 unités, opaque à 80 */}
      <fog attach="fog" args={[universe.background, 18, 80]} />

      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 3, 5]} intensity={2.2} color="#dfe6ff" />
      <pointLight ref={accentLightRef} position={[-6, -2, 2]} intensity={30} color={universe.accent} />
    </>
  );
}

export default Atmosphere;
