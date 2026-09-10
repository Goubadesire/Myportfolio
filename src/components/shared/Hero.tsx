"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, FileText, Code2, Terminal } from "lucide-react";


export default function Hero() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Halo lumineux d'arrière-plan (Glow Effect) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[500px] h-[300px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col items-start max-w-3xl">
        
        {/* Badge d'état / Spécialisation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold mb-8 backdrop-blur-md"
        >
          <Terminal className="w-4 h-4" />
          <span>Développeur Backend & Full-Stack — À la recherche d&apos;un stage de 6 mois</span>
        </motion.div>

        {/* Titre Principal avec Gradients */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight leading-[1.1] mb-6"
        >
          Je conçois des API et des applications web modernes avec {" "}
          <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
            TypeScript, Node.js et PostgreSQL.
          </span>
        </motion.h1>

        {/* Description / Accroche */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed mb-10"
        >
          Spécialisé en <span className="font-semibold text-zinc-900 dark:text-zinc-100">Node.js</span>,{" "}
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">NestJS</span>,{" "}
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">PostgreSQL</span> et{" "}
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">Laravel</span>. J&apos;aime concevoir des architectures propres, sécuriser les applications et transformer des besoins métier en solutions concrètes..
        </motion.p>

        {/* Boutons d'Action (CTAs) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center gap-4 mb-12 w-full sm:w-auto"
        >
          {/* 
          <a
            href="#Footer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base transition-all duration-300 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <span>Me Contacter</span>
            <ArrowUpRight className="w-5 h-5" />
          </a>
          */}

          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold text-base transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <Code2 className="w-5 h-5 text-emerald-500" />
            <span>Voir mes projets</span>
          </a>
        </motion.div>

        {/* Liens Réseaux Sociaux & CV */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center gap-5 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 w-full"
        >
          {/* GitHub SVG */}
          <a
            href="https://github.com/goubadesire"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/40 transition-all duration-300 group"
            aria-label="Profil GitHub"
          >
            <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          {/* LinkedIn SVG 
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/40 transition-all duration-300 group"
            aria-label="Profil LinkedIn"
          >
            <svg className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          */}

          {/* Email */}
          <a
            href="mailto:goubadesire0@gmail.com"
            className="p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/40 transition-all duration-300 group"
            aria-label="Envoyer un e-mail"
          >
            <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/2250500802026"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/40 transition-all duration-300 group"
            aria-label="Me contacter sur WhatsApp"
          >
            <svg
              className="w-5 h-5 fill-current group-hover:scale-110 transition-transform"
              viewBox="0 0 24 24"
            >
              <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.48 0 .14 5.34.14 11.9c0 2.1.55 4.15 1.6 5.96L.04 24l6.3-1.65a11.87 11.87 0 0 0 5.69 1.45h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.16-3.42-8.42ZM12.04 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.65-.23-.37a9.88 9.88 0 1 1 8.38 4.63Zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z" />
            </svg>
          </a>

          <div className="h- w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />

          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
          >
            <FileText className="w-4 h-4 text-emerald-500" />
            <span>Télécharger CV</span>
          </a>
          
        </motion.div>

      </div>
    </section>
  );
}