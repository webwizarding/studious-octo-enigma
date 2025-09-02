/**
 * @file src/components/card3d/BusinessCard3D.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Mon, Aug 26 2025
 * @updated Tue, Aug 26 2025
 *
 * @description
 * Surreal brutal 3D business card scene.
 */

"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";

import { BackgroundFX } from "./BackgroundFX";
import { PostFX } from "./PostFX";
import { CardMesh } from "./CardMesh";

interface Props {
  name: string;
  title: string;
}

const Scene: React.FC<Props> = ({ name, title }) => (
  <>
    <BackgroundFX />
    <Suspense fallback={null}>
      <Float
        floatIntensity={0.2}
        rotationIntensity={0.4}
        speed={1.5}
        floatingRange={[-0.1, 0.1]}
      >
        <CardMesh name={name} title={title} />
      </Float>
    </Suspense>
    <PostFX />
  </>
);

export const BusinessCard3D: React.FC<Props> = ({ name, title }) => {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 3.2], fov: 50, near: 0.1, far: 100 }}
        className="w-full h-full"
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#000000");
        }}
      >
        <Scene name={name} title={title} />
      </Canvas>
    </div>
  );
};
