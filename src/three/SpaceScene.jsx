// ============================================================
//  SCÈNE 3D (Three.js via @react-three/fiber)
//
//  @react-three/fiber ("R3F") permet d'écrire du Three.js avec
//  des balises JSX : <mesh>, <sphereGeometry>... correspondent
//  directement aux classes Three.js (THREE.Mesh, THREE.SphereGeometry).
//
//  Ce fichier ASSEMBLE la scène ; chaque élément est dans son
//  propre fichier :
//  - Atmosphere : fond, brouillard, lumières (couleurs de l'univers)
//  - Starfield  : étoiles qui défilent avec le scroll
//  - Nebulae    : nuages colorés à l'horizon
//  - bodies/    : l'astre principal de chaque univers
//  - Landmarks  : les objets croisés pendant le voyage
//  - CameraRig  : la caméra qui avance quand on scrolle
// ============================================================

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { getUniverse } from "../data/universes";
import Atmosphere from "./Atmosphere";
import Starfield from "./Starfield";
import Nebulae from "./Nebulae";
import Landmarks from "./Landmarks";
import CameraRig from "./CameraRig";
import PlatinumPlanet from "./bodies/PlatinumPlanet";
import AuroraCrystal from "./bodies/AuroraCrystal";
import AmberStar from "./bodies/AmberStar";
import BlackHole from "./bodies/BlackHole";
import styles from "./SpaceScene.module.css";

function SpaceScene({ pathname }) {
  const universe = getUniverse(pathname);

  // useRef garde une valeur entre les rendus SANS provoquer de re-rendu :
  // parfait pour des valeurs modifiées 60 fois par seconde.
  const warpRef = useRef(1); // intensité du saut (1 au départ = effet "arrivée")
  const travelRef = useRef(0); // distance parcourue grâce au scroll

  // À chaque changement de page, on relance le saut en hyperespace
  useEffect(() => {
    warpRef.current = 1;
  }, [pathname]);

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55, far: 200 }}
        dpr={[1, 1.75]} // limite la résolution sur les écrans très denses (performances)
        // Le canvas est DERRIÈRE le contenu : on écoute donc la souris sur
        // toute la page (#root) pour que la 3D réagisse quand même.
        eventSource={document.getElementById("root")}
        eventPrefix="client"
      >
        <Atmosphere universe={universe} />
        <Starfield universe={universe} warpRef={warpRef} travelRef={travelRef} />
        <Nebulae universe={universe} />

        {/* Les 4 astres existent en permanence ; seul celui de la page
            actuelle est "actif", les autres repartent dans les profondeurs. */}
        <PlatinumPlanet active={universe.key === "home"} />
        <AuroraCrystal active={universe.key === "projects"} />
        <AmberStar active={universe.key === "about"} />
        <BlackHole active={universe.key === "contact"} />

        <Landmarks activeKey={universe.key} />
        <CameraRig warpRef={warpRef} travelRef={travelRef} />

        {/* Environnement lumineux "studio" reflété par les surfaces métalliques.
            Les Lightformer sont des panneaux de lumière virtuels : c'est grâce à
            eux que la planète a cet aspect platine brillant. */}
        <Environment resolution={256} frames={1}>
          {/* Fond gris bleuté : sans lui, le métal refléterait du noir */}
          <color attach="background" args={["#4a4e5c"]} />
          <Lightformer intensity={4} color="#ffffff" position={[5, 5, 5]} scale={[12, 4, 1]} />
          <Lightformer intensity={2} color="#ffffff" position={[0, 6, 0]} scale={[14, 14, 1]} />
          <Lightformer intensity={2} color="#8fe9ff" position={[-5, 2, -3]} scale={4} form="ring" />
          <Lightformer intensity={2} color="#8f7cff" position={[-5, -3, 2]} scale={[8, 8, 1]} />
          <Lightformer intensity={1} color="#e5e4e2" position={[0, 0, -10]} scale={[20, 2, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

export default SpaceScene;
