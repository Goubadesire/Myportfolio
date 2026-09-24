import Hero from "@/components/shared/Hero";
import Projects from "@/components/shared/Projects";
import Skills from "@/components/shared/Skills";
import About from "@/components/shared/About";
import { Code2, Database, ShieldCheck, Rocket } from "lucide-react";

const approach = [
  {
    icon: Code2,
    title: "Concevoir",
    description: "Je structure les APIs, les flux métier et les modèles de données avant de coder pour éviter la dette technique.",
  },
  {
    icon: Database,
    title: "Modéliser",
    description: "Je m’appuie sur des schémas SQL propres, des relations cohérentes et une logique de données claire et maintenable.",
  },
  {
    icon: ShieldCheck,
    title: "Valider",
    description: "Je travaille sur la sécurité, la validation, la gestion d’erreurs et la qualité du code pour livrer des solutions fiables.",
  },
  {
    icon: Rocket,
    title: "Livrer",
    description: "Je privilégie des projets évolutifs, bien documentés et prêts à être déployés ou étendus dans un environnement réel.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
      <Hero />
      <About />

      <section id="approach" className="py-20 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <Rocket className="w-4 h-4" />
            Mon approche
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
            Je développe avec une logique <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">projet, sécurité et évolutivité</span>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {approach.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-zinc-200/80 bg-white/60 p-6 dark:border-zinc-800 dark:bg-zinc-900/50 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-emerald-500/40"
            >
              <div className="mb-4 inline-flex rounded-xl bg-emerald-500/10 p-3 text-emerald-500">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">{title}</h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <Projects />
      <Skills />

      <section id="contact" className="py-20 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-white to-teal-500/10 p-8 text-center dark:from-emerald-500/10 dark:via-zinc-900 dark:to-teal-500/10 sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
            Disponible pour un stage / opportunité
          </p>
          <h2 className="mt-4 text-3xl font-black text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            Je cherche à intégrer une équipe tech pour construire des solutions backend solides.
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:goubadesire0@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Me contacter
            </a>
            <a
              href="/cvGoubaDesire.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white/70 px-6 py-3 text-sm font-semibold text-zinc-800 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-100"
            >
              Télécharger le CV
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
