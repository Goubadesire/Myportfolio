"use client";

import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Halo lumineux qui suit la souris à l'intérieur de la carte (effet Stripe).
// La position est passée au CSS via deux variables, sans re-render React.
export function SpotlightCard({
  children,
  className,
  color = "94 225 255",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      onMouseMove={onMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-line bg-surface/80 transition-colors duration-500 hover:border-white/15",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--x) var(--y), rgb(${color} / 0.13), transparent 60%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
