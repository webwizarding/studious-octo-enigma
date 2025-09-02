/**
 * @file src/components/card3d/BackgroundFX.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Tue, Aug 26 2025
 * @updated Tue, Aug 26 2025
 *
 * @description
 * Surreal eerie environment with brutal lighting.
 */

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";

export const BackgroundFX: React.FC = () => {
  const lightRef1 = useRef<THREE.DirectionalLight>(null!);
  const lightRef2 = useRef<THREE.DirectionalLight>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (lightRef1.current) {
      lightRef1.current.intensity = 2.1 + Math.sin(t * 0.5) * 0.3;
    }
    if (lightRef2.current) {
      lightRef2.current.intensity = 1.2 + Math.cos(t * 0.7) * 0.2;
    }
  });

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fogExp2 attach="fog" args={["#0a0012", 0.015]} />

      <Stars
        radius={50}
        depth={50}
        count={5000}
        factor={2}
        saturation={0.5}
        fade
        speed={2}
      />

      <Sparkles
        count={100}
        scale={10}
        size={2}
        speed={0.4}
        opacity={0.6}
        color="#f5c2e7"
      />

      <Environment preset="night" />

      <directionalLight
        ref={lightRef1}
        position={[5, 5, 5]}
        intensity={2.1}
        color="#89dceb"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      <directionalLight
        ref={lightRef2}
        position={[-5, 3, -5]}
        intensity={1.5}
        color="#f5c2e7"
      />

      <spotLight
        position={[0, 10, 0]}
        intensity={2}
        angle={0.3}
        penumbra={1}
        color="#cba6f7"
        castShadow
      />

      <ambientLight intensity={0.05} color="#0a0012" />
    </>
  );
};
