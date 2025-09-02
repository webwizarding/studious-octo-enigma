/**
 * @file src/lib/three/RoundedRectPlaneGeometry.ts
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Tue, Aug 26 2025
 * @updated Tue, Aug 26 2025
 *
 * @description
 * Custom rounded rectangle plane geometry for Three.js.
 * Creates a single-sided plane with rounded corners for business card effect.
 */

import * as THREE from "three";
import { extend } from "@react-three/fiber";

/**
 * @class RoundedRectPlaneGeometry
 * @description Rounded rectangle plane (single-sided) geometry.
 * @param {number} width - Width of the rectangle
 * @param {number} height - Height of the rectangle
 * @param {number} radius - Corner radius
 * @param {number} segments - Number of segments for rounded corners
 */
export class RoundedRectPlaneGeometry extends THREE.BufferGeometry {
  constructor(width = 1, height = 1, radius = 0.1, segments = 8) {
    super();

    const hw = width / 2;
    const hh = height / 2;
    const r = Math.min(radius, hw, hh);

    const shape = new THREE.Shape();
    shape.moveTo(-hw + r, -hh);
    shape.lineTo(hw - r, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
    shape.lineTo(hw, hh - r);
    shape.quadraticCurveTo(hw, hh, hw - r, hh);
    shape.lineTo(-hw + r, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
    shape.lineTo(-hw, -hh + r);
    shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);

    const geo = new THREE.ShapeGeometry(shape, segments);
    geo.computeVertexNormals();

    this.setAttribute("position", geo.attributes.position);
    if (geo.attributes.normal)
      this.setAttribute("normal", geo.attributes.normal);
    if (geo.index) this.setIndex(geo.index);
    this.computeBoundingSphere();
  }
}

extend({ RoundedRectPlaneGeometry });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      roundedRectPlaneGeometry: {
        args?: ConstructorParameters<typeof RoundedRectPlaneGeometry>;
        attach?: string;
      };
    }
  }
}
