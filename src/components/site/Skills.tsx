import { Reveal } from "@/components/effects/Reveal";
import { SpotlightCard } from "@/components/effects/SpotlightCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { allSkills, skillCategories, type Skill } from "@/data/skills";
import { cn } from "@/lib/utils";

function Marquee({ items, reverse = false }: { items: Skill[]; reverse?: boolean }) {
  return (
    <div className="group flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      {/* La liste est dupliquée : quand la 1re copie sort à gauche, la 2e a pris sa place,
          et l'animation (translateX de 0 à -50 %) boucle sans saut visible. */}
      <ul
        className={cn(
          "flex w-max shrink-0 gap-4 pr-4 group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {[...items, ...items].map((skill, index) => {
          const Icon = skill.icon;
          return (
            <li
              key={`${skill.name}-${index}`}
              aria-hidden={index >= items.length}
              className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-5 py-3.5"
            >
              <Icon className="size-5" style={{ color: skill.color }} />
              <span className="whitespace-nowrap text-sm font-medium text-zinc-200">{skill.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Skills() {
  const half = Math.ceil(allSkills.length / 2);

  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Compétences"
          title={
            <>
              La boîte à outils <span className="text-electric">du quotidien.</span>
            </>
          }
          description="Un socle backend solide, associé à une bonne maîtrise de l'intégration front et des outils de travail collaboratif."
        />
      </div>

      <Reveal className="mt-16 space-y-4">
        <Marquee items={allSkills.slice(0, half)} />
        <Marquee items={allSkills.slice(half)} reverse />
      </Reveal>

      <div className="mx-auto mt-16 grid max-w-6xl gap-4 px-6 sm:grid-cols-2">
        {skillCategories.map((category, index) => (
          <Reveal key={category.title} delay={index * 0.08}>
            <SpotlightCard className="h-full p-8">
              <h3 className="text-xl font-semibold tracking-tight">{category.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{category.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {category.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <li
                      key={skill.name}
                      className="flex items-center gap-2 rounded-full border border-line bg-white/3 px-3 py-1.5 text-sm text-zinc-300 transition hover:-translate-y-0.5 hover:border-white/20"
                    >
                      <Icon className="size-4" style={{ color: skill.color }} />
                      {skill.name}
                    </li>
                  );
                })}
              </ul>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
