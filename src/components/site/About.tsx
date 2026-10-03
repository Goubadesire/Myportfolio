import { GraduationCap, MapPin, Zap } from "lucide-react";
import { Reveal } from "@/components/effects/Reveal";
import { SpotlightCard } from "@/components/effects/SpotlightCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { site } from "@/data/site";

const focus = ["API REST", "Modélisation SQL", "Architecture backend", "Clean Code", "Sécurité", "Performance"];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="À propos"
        title={
          <>
            Des idées transformées en <span className="text-electric">solutions fiables.</span>
          </>
        }
      />

      <div className="mt-16 grid gap-4 md:grid-cols-3 md:grid-rows-[auto_auto]">
        <Reveal className="md:col-span-2 md:row-span-2">
          <SpotlightCard className="h-full p-8 sm:p-10">
            <GraduationCap className="size-6 text-volt" />
            <h3 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
              Étudiant en Génie Logiciel, orienté API, données et architecture.
            </h3>
            <div className="mt-6 space-y-4 text-pretty leading-relaxed text-zinc-400">
              <p>
                Actuellement en Licence 3 après une formation d&apos;Informaticien Développeur d&apos;Applications (IDA), je
                cherche un <span className="text-white">stage de 6 mois</span> pour mettre mes compétences en pratique
                dans un environnement de production et grandir au sein d&apos;une équipe technique.
              </p>
              <p>
                Je travaille au quotidien avec <span className="text-white">Node.js, NestJS, TypeScript, Laravel,
                PostgreSQL et MySQL</span>. Ce qui me motive : concevoir des architectures propres, découper
                logiquement le code et optimiser les performances.
              </p>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {focus.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line bg-white/3 px-3.5 py-1.5 text-xs font-medium text-zinc-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={0.1}>
          <SpotlightCard className="h-full p-8">
            <Zap className="size-6 text-volt" />
            <p className="mt-6 text-6xl font-semibold tracking-tighter text-electric">6 mois</p>
            <p className="mt-3 text-sm text-zinc-400">de stage recherché, en backend ou full-stack.</p>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={0.2}>
          <SpotlightCard className="h-full p-8">
            <MapPin className="size-6 text-volt" />
            <p className="mt-6 text-2xl font-semibold tracking-tight">{site.location}</p>
            <p className="mt-3 text-sm text-zinc-400">Fuseau horaire GMT (UTC+0).</p>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
