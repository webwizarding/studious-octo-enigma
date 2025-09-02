/**
 * @file src/components/card3d/PostFX.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Tue, Aug 26 2025
 * @updated Tue, Aug 26 2025
 *
 * @description
 * Post-processing for surreal brutal aesthetic.
 */

import React from "react";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  DepthOfField,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

export const PostFX: React.FC = () => (
  <EffectComposer multisampling={4}>
    <Bloom mipmapBlur luminanceThreshold={0.1} intensity={1.2} radius={0.8} />
    <ChromaticAberration
      offset={new Vector2(0.003, 0.003)}
      blendFunction={BlendFunction.NORMAL}
    />
    <Vignette eskil={false} offset={0.1} darkness={1.4} />
    <Noise opacity={0.08} blendFunction={BlendFunction.OVERLAY} />
    <DepthOfField focusDistance={0.01} focalLength={0.02} bokehScale={3} />
  </EffectComposer>
);
