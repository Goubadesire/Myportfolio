"use client";

import type { ReactNode } from "react";
import { motion, useScroll, useSpring } from "motion/react";

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

// Apparition au scroll : l'élément remonte et passe du flou au net
// la première fois qu'il entre dans l'écran.
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-linear-to-r from-volt via-volt-strong to-plasma shadow-[0_0_12px_#5ee1ff]"
    />
  );
}
