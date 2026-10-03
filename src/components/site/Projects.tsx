"use client";

import { useRef, useSyncExternalStore, type MouseEvent } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { SectionHeading } from "@/components/site/SectionHeading";
import { projects, type Project } from "@/data/projects";

// L'empilement au scroll n'est activé que sur grand écran :
// sur mobile, les cartes sont trop hautes pour rester collées à l'écran.
const desktopQuery = "(min-width: 768px)";
function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(desktopQuery);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia(desktopQuery).matches,
    () => false,
  );
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative mx-auto h-full max-h-115 w-auto max-w-55 overflow-hidden rounded-[2.2rem] border-[6px] border-zinc-800 bg-black shadow-2xl sm:max-w-60">
        <Image
          src={project.image}
          alt={`Capture d'écran de ${project.title}`}
          width={395}
          height={814}
          className="h-full w-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
        />
      </div>
    );
  }

  // Pas de capture : une composition graphique aux couleurs du projet.
  return (
    <div className="relative flex h-full min-h-56 w-full items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface-2">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-70" />
      <div
        aria-hidden
        className="absolute size-72 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${project.accent}55, transparent 65%)` }}
      />
      <span
        className="relative text-[9rem] font-semibold leading-none tracking-tighter"
        style={{ color: "transparent", WebkitTextStroke: `1.5px ${project.accent}` }}
      >
        {project.title.charAt(0)}
      </span>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  progress,
  range,
  targetScale,
  isLast,
}: {
  project: Project;
  index: number;
  isLast: boolean;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const isDesktop = useIsDesktop();

  // Le halo suit la souris via deux variables CSS : aucun re-render React.
  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };
  // Plus on avance dans la pile, plus la carte précédente rétrécit sous la suivante.
  const scale = useTransform(progress, range, [1, targetScale]);
  const dim = useTransform(progress, range, [0, 0.5]);

  return (
    <div className="flex items-center justify-center md:sticky md:top-0 md:h-svh">
      <motion.div
        style={isDesktop ? { scale, top: `calc(-5vh + ${index * 28}px)` } : undefined}
        className="relative w-full origin-top"
      >
        <article
          onMouseMove={onMouseMove}
          className="group relative grid gap-8 overflow-hidden rounded-[28px] border border-line bg-surface p-6 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] transition-colors duration-700 hover:border-white/15 sm:p-10 md:h-[min(78vh,620px)] md:grid-cols-[1.15fr_1fr]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, ${project.accent}22, transparent 70%)` }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{ background: `radial-gradient(600px circle at var(--x) var(--y), ${project.accent}14, transparent 60%)` }}
          />
          {/* Fin liseré lumineux en haut de la carte, comme un reflet sur du verre. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-12 top-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${project.accent}80, transparent)` }}
          />

          <div className="relative flex flex-col md:justify-center">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: project.accent }}>
              <span>0{index + 1}</span>
              <span className="h-px w-6 bg-current opacity-50" />
              <span>{project.tagline}</span>
            </div>
            <h3 className="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{project.title}</h3>
            <p className="mt-4 text-pretty leading-relaxed text-zinc-400">{project.description}</p>

            <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
              {[
                ["Défi", project.challenge],
                ["Approche", project.approach],
                ["Résultat", project.result],
              ].map(([label, text]) => (
                <div key={label}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{label}</dt>
                  <dd className="mt-1.5 leading-relaxed text-zinc-300 md:line-clamp-3 lg:line-clamp-4">{text}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-6 flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <li key={tech} className="rounded-full border border-line px-2.5 py-1 text-[11px] text-zinc-400">
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-volt"
                >
                  Voir la démo
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-white/30 hover:text-white"
                >
                  <SiGithub className="size-4" />
                  Code source
                </a>
              )}
            </div>
          </div>

          <div className="relative min-h-0">
            <ProjectVisual project={project} />
          </div>

          {/* Assombrit la carte quand elle passe sous la suivante. */}
          {!isLast && (
            <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 hidden bg-ink md:block" />
          )}
        </article>
      </motion.div>
    </div>
  );
}

export function Projects() {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 pt-24 sm:pt-32">
      <SectionHeading
        eyebrow="Projets"
        title={
          <>
            Des projets <span className="text-electric">concrets.</span>
          </>
        }
        description="Des applications qui allient clarté fonctionnelle, bon usage des données et expérience utilisateur fluide.."
      />

      <div ref={stackRef} className="mt-16 space-y-8 md:mt-0 md:space-y-0">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            progress={scrollYProgress}
            range={[index / projects.length, 1]}
            targetScale={1 - (projects.length - index - 1) * 0.05}
            isLast={index === projects.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
