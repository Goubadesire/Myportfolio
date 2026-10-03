"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

// Lenis lisse le défilement de la molette (l'effet « glissé » des sites Apple).
// Il garde le scroll natif de la page, donc les animations liées au scroll
// de Motion (useScroll) continuent de fonctionner.
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -72 } }}>
      {children}
    </ReactLenis>
  );
}
