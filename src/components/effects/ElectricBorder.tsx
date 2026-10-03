"use client";

import { useId, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

type ElectricBorderProps = {
  children: ReactNode;
  className?: string;
  color?: string;
  radius?: number;
  active?: boolean;
  // Amplitude des déformations de l'arc, en pixels.
  chaos?: number;
};

/**
 * Bordure parcourue d'un arc électrique.
 * Un filtre SVG génère du bruit (feTurbulence) dont la graine change très vite,
 * puis déforme le trait de la bordure avec ce bruit (feDisplacementMap) : le trait
 * « grésille » comme un arc électrique.
 */
export function ElectricBorder({
  children,
  className,
  color = "#5ee1ff",
  radius = 24,
  active = true,
  chaos = 7,
}: ElectricBorderProps) {
  const filterId = `electric-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <div className={cn("relative", className)} style={{ borderRadius: radius }}>
      <AnimatePresence>
        {active && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <svg className="absolute h-0 w-0">
              <defs>
                <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
                  <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="3" seed="1" result="noise">
                    <animate
                      attributeName="seed"
                      values="1;7;3;12;5;9;2;15;6;11"
                      dur="1s"
                      calcMode="discrete"
                      repeatCount="indefinite"
                    />
                  </feTurbulence>
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale={chaos} xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>
            </svg>

            <div
              className="absolute inset-0"
              style={{ borderRadius: radius, border: `1.5px solid ${color}`, filter: `url(#${filterId})` }}
            />
            <div
              className="absolute inset-0 animate-flicker"
              style={{ borderRadius: radius, border: `2px solid ${color}`, filter: "blur(5px)", opacity: 0.75 }}
            />
            <div
              className="absolute inset-0"
              style={{ borderRadius: radius, boxShadow: `0 0 48px -10px ${color}, inset 0 0 36px -18px ${color}` }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}
