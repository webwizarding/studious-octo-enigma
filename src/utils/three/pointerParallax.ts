/**
 * @file src/utils/three/pointerParallax.ts
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Tue, Aug 26 2025
 * @updated Tue, Aug 26 2025
 *
 * @description
 * Pointer-based parallax helper for R3F scenes.
 * Tracks mouse/touch position and provides damped values for smooth animations.
 */

"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { damp } from "maath/easing";

/**
 * @function usePointerParallax
 * @description Returns a ref with { x, y } values that follow the pointer with damping.
 * Values are normalized to -1 to 1 range.
 */
export const usePointerParallax = () => {
  const target = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const current = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      target.current.x = x;
      target.current.y = y;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, dt) => {
    damp(current.current, "x", target.current.x, 3, dt);
    damp(current.current, "y", target.current.y, 3, dt);
  });

  return current;
};
