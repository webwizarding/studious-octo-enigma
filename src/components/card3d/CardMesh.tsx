/**
 * @file src/components/card3d/CardMesh.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Tue, Aug 26 2025
 * @updated Tue, Aug 26 2025
 *
 * @description
 * Surreal brutal business card with HTML text that tracks the card.
 */

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";
import { damp3, damp } from "maath/easing";
import { usePointerParallax } from "@/utils/three/pointerParallax";

interface CardMeshProps {
  name: string;
  title: string;
}

export const CardMesh: React.FC<CardMeshProps> = ({ name, title }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const parallax = usePointerParallax();
  const timeRef = useRef(0);

  useFrame((state, dt) => {
    if (!groupRef.current) return;

    timeRef.current += dt;
    const t = timeRef.current;

    const targetRotX = parallax.current.y * -0.4 + Math.sin(t * 0.3) * 0.15;
    const targetRotY =
      parallax.current.x * 0.6 + Math.cos(t * 0.2) * 0.1 + t * 0.1;
    const targetPosY = Math.sin(t * 0.8) * 0.05;
    const targetPosZ = Math.sin(t * 0.5) * 0.1;

    damp(groupRef.current.rotation, "x", targetRotX, 3, dt);
    groupRef.current.rotation.y = targetRotY;
    damp3(groupRef.current.position, [0, targetPosY, targetPosZ], 4, dt);
  });

  const cardW = 3.375;
  const cardH = 2.125;
  const cardDepth = 0.08;

  const [position, company] = title.split(" @ ") || ["", ""];

  return (
    <group ref={groupRef}>
      <RoundedBox
        ref={meshRef}
        args={[cardW, cardH, cardDepth]}
        radius={0.05}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#0a0a0a"
          metalness={0.95}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={2}
          reflectivity={1}
        />
      </RoundedBox>

      {/* Name - centered on card */}
      <Html
        center
        position={[0, 0.3, cardDepth / 2 + 0.01]}
        transform
        occlude
        style={{
          width: `${cardW * 100}px`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "#f5c2e7",
            fontSize: "26px",
            fontWeight: "bold",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontFamily: "JetBrains Mono, monospace",
            textShadow: `
                            0 0 10px #ff69b4,
                            0 0 20px #ff69b4,
                            0 0 30px #ff69b4,
                            2px 2px 0 #000
                        `,
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </div>
      </Html>

      {/* Title and Company - bottom left */}
      <Html
        position={[-cardW / 2 + 0.3, -cardH / 2 + 0.4, cardDepth / 2 + 0.01]}
        transform
        occlude
      >
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              color: "#89dceb",
              fontSize: "14px",
              fontWeight: "600",
              fontFamily: "JetBrains Mono, monospace",
              textShadow: "0 0 5px #89dceb, 1px 1px 0 #000",
              marginBottom: "4px",
              whiteSpace: "nowrap",
            }}
          >
            {position}
          </div>
          <div
            style={{
              color: "#cdd6f4",
              fontSize: "10px",
              fontFamily: "JetBrains Mono, monospace",
              textShadow: "1px 1px 0 #000",
              whiteSpace: "nowrap",
            }}
          >
            {company}
          </div>
        </div>
      </Html>
    </group>
  );
};
