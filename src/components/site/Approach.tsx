"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "motion/react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Concevoir",
    description: "Je structure les APIs, les flux métier et les modèles de données avant d'écrire la moindre ligne, pour éviter la dette technique.",
  },
  {
    title: "Modéliser",
    description: "Des schémas SQL propres, des relations cohérentes et une logique de données claire et maintenable.",
  },
  {
    title: "Valider",
    description: "Sécurité, validation des entrées, gestion d'erreurs et qualité du code : des solutions fiables, pas seulement fonctionnelles.",
  },
  {
    title: "Livrer",
    description: "Des projets documentés, évolutifs et prêts à être déployés ou étendus dans un environnement réel.",
  },
];

function Step({ index, title, description }: { index: number; title: string; description: string }) {
  const ref = useRef<HTMLLIElement>(null);
  // L'étape « s'allume » quand elle passe au-dessus des 40 % bas de l'écran.
  const lit = useInView(ref, { margin: "0px 0px -40% 0px" });

  return (
    <li ref={ref} className="relative pb-20 pl-14 last:pb-0 sm:pl-20">
      <span
        className={cn(
          "absolute left-0 top-1 flex size-9 items-center justify-center rounded-full border font-mono text-xs transition-all duration-500 sm:left-2",
          lit ? "border-volt bg-volt text-ink glow-volt" : "border-line bg-ink text-zinc-500",
        )}
      >
        0{index + 1}
      </span>
      <motion.div
        animate={{ opacity: lit ? 1 : 0.35, x: lit ? 0 : 12 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h3>
        <p className="mt-3 max-w-lg text-pretty leading-relaxed text-zinc-400">{description}</p>
      </motion.div>
    </li>
  );
}

export function Approach() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.6", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="approach" className="mx-auto grid max-w-6xl gap-16 px-6 py-24 sm:py-32 lg:grid-cols-[1fr_1.2fr]">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <SectionHeading
          eyebrow="Approche"
          title={
            <>
              Une méthode, <span className="text-electric">quatre temps.</span>
            </>
          }
          description="Je développe avec une logique projet : comprendre le besoin, poser les fondations, sécuriser, puis livrer."
        />
      </div>

      <ol ref={listRef} className="relative">
        {/* Rail de fond + courant électrique qui se remplit au fil du scroll. */}
        <span aria-hidden className="absolute bottom-0 left-[17px] top-1 w-px bg-line sm:left-[25px]" />
        <motion.span
          aria-hidden
          style={{ scaleY }}
          className="absolute bottom-0 left-[17px] top-1 w-px origin-top bg-linear-to-b from-volt via-volt-strong to-plasma shadow-[0_0_10px_2px_rgba(94,225,255,0.5)] sm:left-[25px]"
        />
        {steps.map((step, index) => (
          <Step key={step.title} index={index} {...step} />
        ))}
      </ol>
    </section>
  );
}
