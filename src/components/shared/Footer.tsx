"use client";

import { Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-zinc-200/80 dark:border-zinc-800/80 py-12 mt-20 relative overflow-hidden">
      {/* Glow d'arrière-plan */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -z-10 w-96 h-24 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 flex flex-col gap-8">
        {/* Ligne supérieure : Identité, disponibilité & Réseaux */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Gouba Désiré
            </span>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                Disponible pour un stage / opportunités
              </span>
            </div>
          </div>

          {/* Liens réseaux sociaux & Retour en haut */}
          <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
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
            {/*
            <a
              href="https://linkedin.com/in/ton-profil"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 hover:text-emerald-500 hover:border-emerald-500/50 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            */}
             <a
             id="Footer"
            href="mailto:goubadesire0@gmail.com"
            className="p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/40 transition-all duration-300 group"
            aria-label="Envoyer un e-mail"
          >
            <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>
            
            <button
              onClick={scrollToTop}
              className="p-2 ml-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 hover:text-emerald-500 hover:border-emerald-500/50 transition-all duration-300"
              aria-label="Retour en haut de page"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Ligne inférieure : Copyright & Tech stack */}
        <div className="pt-6 border-t border-zinc-200/50 dark:border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
          <p>© {new Date().getFullYear()} Gouba. Tous droits réservés.</p>
          <p className="text-zinc-400 dark:text-zinc-500">
            Conçu avec <span className="text-zinc-700 dark:text-zinc-300">Next.js</span>, <span className="text-zinc-700 dark:text-zinc-300">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}