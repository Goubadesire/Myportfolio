"use client";

import { useRef, type PointerEvent } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowRight, Download } from "lucide-react";
import { easeOutExpo } from "@/components/effects/Reveal";
import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { site } from "@/data/site";

const lines = [
  { words: ["Des", "backends"], electric: false },
  { words: ["sous", "haute", "tension."], electric: true },
];

function HeroBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Secours si WebGL est indisponible : un dégradé conique flou qui tourne lentement. */}
      <div className="absolute left-1/2 top-[38%] size-[95vmax] -translate-x-1/2 -translate-y-1/2 animate-[spin_50s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,#2f7bff,#5ee1ff,#9b6bff,#2f7bff)] opacity-[0.13] blur-[120px]" />

      {/* Aurore animée en WebGL : elle recouvre le dégradé de secours dès qu'elle est prête. */}
      <AuroraBackground className="absolute inset-0 size-full" />

      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Faisceau de lumière qui tombe du haut de l'écran. */}
      <div className="absolute inset-x-0 top-0 h-[85vh] bg-[radial-gradient(ellipse_45%_60%_at_50%_0%,rgba(94,225,255,0.1),transparent_70%)]" />

      {/* Horizon lumineux : un grand arc dont seul le bord supérieur brille. */}
      <div className="absolute left-1/2 top-[80%] h-[70vh] w-[160vw] -translate-x-1/2 rounded-[100%] border-t border-volt/30 bg-ink shadow-[0_-40px_140px_-30px_rgba(94,225,255,0.45),inset_0_30px_60px_-40px_rgba(94,225,255,0.35)] sm:w-[130vw]" />

      {/* Halo qui suit la souris (position mise à jour par le hero). */}
      <div className="absolute inset-0 bg-[radial-gradient(500px_circle_at_var(--x,50%)_var(--y,40%),rgba(94,225,255,0.07),transparent_60%)]" />
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Progression de 0 (hero en haut de l'écran) à 1 (hero sorti par le haut).
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const blur = useTransform(scrollYProgress, [0, 0.8], ["blur(0px)", "blur(12px)"]);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  return (
    <section id="top" ref={ref} onPointerMove={onPointerMove} className="relative h-svh min-h-170 overflow-hidden">
      <HeroBackdrop />

      <motion.div
        style={{ scale, opacity, y, filter: blur }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 pb-16 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/4 px-4 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-md"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          Disponible pour un stage de 6 mois
        </motion.p>

        <h1 className="text-[clamp(3rem,10vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
          {lines.map((line, lineIndex) => (
            <span key={lineIndex} className="flex flex-wrap justify-center gap-x-[0.22em]">
              {line.words.map((word, index) => {
                const previousWords = lineIndex === 0 ? 0 : lines[0].words.length;
                const delay = 0.15 + (previousWords + index) * 0.08;
                return (
                  // Chaque mot monte depuis un masque (overflow-hidden) : l'effet « titre Apple ».
                  <span key={word} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <motion.span
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1.1, delay, ease: easeOutExpo }}
                      className={`inline-block ${line.electric ? "text-electric" : "bg-linear-to-b from-white to-zinc-400 bg-clip-text text-transparent"}`}
                    >
                      {word}
                    </motion.span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: easeOutExpo }}
          className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-zinc-400 sm:text-xl"
        >
          Je suis <span className="text-white">{site.name}</span>, développeur backend & full-stack. Je conçois des API
          robustes, des bases de données propres et des applications web rapides avec TypeScript, NestJS et Next.js.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease: easeOutExpo }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_30px_-6px_rgba(255,255,255,0.35)] transition hover:bg-zinc-200"
          >
            Voir mes projets
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <a
            href={site.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/4 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/25 hover:bg-white/8"
          >
            <Download className="size-4 text-zinc-400 transition-colors group-hover:text-white" />
            Télécharger le CV
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-zinc-500 hover:text-white"
        aria-label="Défiler vers la suite"
      >
        <span className="font-mono uppercase tracking-[0.3em]">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
