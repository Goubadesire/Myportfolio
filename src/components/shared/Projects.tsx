"use client";

import { useEffect, useState } from "react";
import { FolderGit2, ExternalLink, Sparkles, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";

interface Project {
  id: string;
  title: string;
  slug?: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
}

// 🚀 Liste des projets en dur
const HARDCODED_PROJECTS: Project[] = [
  {
    id: "velora",
    title: "Velora — Task & Pomodoro PWA",
    slug: "velora-pwa",
    description:
      "Application web progressive (PWA) de gestion de tâches et de productivité intégrant la méthode Pomodoro. Développée avec Next.js et Supabase pour la gestion en temps réel des données et de l'authentification.",
    techStack: ["Next.js", "React", "Supabase", "TypeScript", "Tailwind CSS", "PWA"],
    githubUrl: "https://github.com/Goubadesire/velora.git",
    demoUrl: "https://velora-five-rust.vercel.app",
  },
  {
    id: "Award2IFGT",
    title: "2IFGT Award",
    slug: "Award",
    description:
      "Site web de vote sécurisé et dynamique pour la grande école 2IFGT.",
    techStack: ["Next.js", "React", "Supabase", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/Goubadesire/award2ifgt.git",
    demoUrl: "https://award2ifgt-final.vercel.app",
  },
  {
    id: "Finance",
    title: "Finance App",
    slug: "Finance",
    description:
      "Application web intuitive de suivi et de gestion des dépenses personnelles.",
    techStack: ["Next.js", "React", "Supabase", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/Goubadesire/finance.git",
    demoUrl: "https://finance-ten-drab.vercel.app",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(HARDCODED_PROJECTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");
        if (response.data && response.data.length > 0) {
          setProjects(response.data);
        }
      } catch (error) {
        console.log("Mode hors-ligne : affichage des projets locaux.");
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 border-t border-zinc-200/80 dark:border-zinc-800/80 relative overflow-hidden">
      {/* Éléments de fond lumineux */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -z-10 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* En-tête de section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center sm:text-left flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Portfolio & Réalisations</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
              Projets <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">Sélectionnés</span>
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 mt-3 max-w-2xl font-normal leading-relaxed">
              Une vitrine de mes applications web modernes, architectures robustes et expériences utilisateurs soignées.
            </p>
          </div>
        </motion.div>

        {/* Grille de projets */}
        {loading ? (
          <div className="text-center py-20 text-zinc-500 font-medium">
            Chargement des projets...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 font-medium">
            Aucun projet à afficher pour le moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/80 dark:border-zinc-800/90 bg-white/70 dark:bg-zinc-900/50 backdrop-blur-md hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-950/30 transition-all duration-300 group"
              >
                {/* En-tête visuel de la carte (Image ou Aperçu stylisé) */}
                {project.imageUrl ? (
                  <div className="relative w-full h-48 overflow-hidden border-b border-zinc-200/80 dark:border-zinc-800/80">
                    <img
                      src={project.imageUrl}
                      alt={`Aperçu de ${project.title}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="relative w-full h-40 bg-gradient-to-br from-zinc-100 via-zinc-50 to-emerald-50/30 dark:from-zinc-900 dark:via-zinc-900/80 dark:to-emerald-950/20 border-b border-zinc-200/60 dark:border-zinc-800/80 flex items-center justify-center overflow-hidden p-6">
                    {/* Motif de fond abstrait style code/grille */}
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
                    
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm">
                        <Code2 className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                        {project.techStack[0] || "Web App"}
                      </span>
                    </div>
                  </div>
                )}

                {/* Contenu principal */}
                <div className="flex flex-col justify-between flex-grow p-6 sm:p-7">
                  <div>
                    {/* Liens rapides en haut de carte */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all"
                            aria-label={`Code source sur GitHub pour ${project.title}`}
                          >
                            <FolderGit2 className="w-4 h-4" />
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all"
                            aria-label={`Démo live pour ${project.title}`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 font-normal line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Stack technique */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 mt-auto">
                    {project.techStack?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}