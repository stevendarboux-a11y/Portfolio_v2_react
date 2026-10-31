// Petite lune qui tourne autour de l'astre principal
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { clampDelta } from "./utils";

function Moon({ radius, speed, size, tilt, color = "#e5e4e2" }) {
  const pivotRef = useRef();

  useFrame((_, delta) => {
    // On fait tourner un "pivot" invisible : la lune, décalée de "radius",
    // décrit donc un cercle autour du centre.
    pivotRef.current.rotation.y += clampDelta(delta) * speed;
  });

  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={pivotRef}>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

export default Moon;
