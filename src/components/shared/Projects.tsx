"use client";

import { useEffect, useState } from "react";
import { FolderGit2, ExternalLink } from "lucide-react";
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
    //imageUrl: "/velora.png", // Placer l'image dans public/projects/velora.png
  },
  {
    id: "Award2IFGT",
    title: "2IFGT Award",
    slug: "Award",
    description:
      "Site web de vote pour la grande école 2IFGT",
    techStack: ["Next.js", "React", "Supabase", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/Goubadesire/award2ifgt.git",
    demoUrl: "https://award2ifgt-final.vercel.app",
    //imageUrl: "/velora.png", // Placer l'image dans public/projects/velora.png
  },
  {
    id: "Finance",
    title: "Finance",
    slug: "Finance",
    description:
      "Application web de gestion de depense",
    techStack: ["Next.js", "React", "Supabase", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/Goubadesire/finance.git",
    demoUrl: "https://finance-ten-drab.vercel.app",
    //imageUrl: "/velora.png", // Placer l'image dans public/projects/velora.png
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
    <section id="projects" className="py-20 border-t border-zinc-200/80 dark:border-zinc-800/80 relative">
      {/* Glow d'arrière-plan */}
      <div className="absolute top-1/2 right-0 -z-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* En-tête */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
          Projets <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">Réalisés</span>
        </h2>
        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mt-3 max-w-2xl font-normal leading-relaxed">
          Une sélection d&apos;API backend robustes, d&apos;architectures de bases de données et d&apos;applications modernes.
        </p>
      </motion.div>

      {/* Grille de projets animée */}
      {loading ? (
        <div className="text-center py-12 text-zinc-500 font-medium">
          Chargement des projets...
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 text-zinc-500 font-medium">
          Aucun projet à afficher pour le moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800/90 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5 dark:hover:shadow-emerald-950/20 transition-all duration-300 group"
            >
              {/* Image de couverture du projet */}
              {project.imageUrl && (
                <div className="relative w-full h-48 sm:h-56 overflow-hidden border-b border-zinc-200/80 dark:border-zinc-800/80">
                  <img
                    src={project.imageUrl}
                    alt={`Aperçu de ${project.title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Contenu de la carte */}
              <div className="flex flex-col justify-between flex-grow p-8">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                      <FolderGit2 className="w-7 h-7" />
                    </div>
                    <div className="flex items-center gap-4 text-zinc-400 dark:text-zinc-500">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors p-1"
                          aria-label={`Code source sur GitHub pour ${project.title}`}
                        >
                          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors p-1"
                          aria-label={`Démo live pour ${project.title}`}
                        >
                          <ExternalLink className="w-6 h-6" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8 font-normal">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 mt-auto">
                  {project.techStack?.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/50"
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
    </section>
  );
}