"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const text =
  "Un bon logiciel se joue là où personne ne regarde : dans l'API, les données et l'architecture. C'est là que je construis des fondations robustes, propres et prêtes à évoluer.";
const highlighted = new Set(["robustes,", "propres", "évoluer."]);

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const isHighlighted = highlighted.has(word);

  return (
    <motion.span style={{ opacity }} className={isHighlighted ? "text-electric" : undefined}>
      {word}{" "}
    </motion.span>
  );
}

// Les mots s'allument un par un au rythme du scroll, comme sur les pages produit d'Apple.
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <section className="relative px-6 py-32 sm:py-48">
      <p
        ref={ref}
        className="mx-auto max-w-5xl text-balance text-[clamp(1.85rem,4.6vw,3.9rem)] font-semibold leading-[1.12] tracking-[-0.03em]"
      >
        {words.map((word, index) => (
          <Word
            key={index}
            word={word}
            progress={scrollYProgress}
            range={[index / words.length, (index + 1) / words.length]}
          />
        ))}
      </p>
    </section>
  );
}
