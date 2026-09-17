"use client";

import { motion } from "framer-motion";
import { Terminal, Database, Cpu, Layers, GraduationCap, Briefcase, CheckCircle2, Code } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 border-t border-zinc-200/80 dark:border-zinc-800/80 relative overflow-hidden">
      {/* Halo lumineux de fond */}
      <div className="absolute top-1/2 left-0 -z-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* En-tête de section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-4 backdrop-blur-md">
          <Code className="w-4 h-4" />
          <span>Découvrez mon parcours</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
          À Propos <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 bg-clip-text text-transparent">de moi</span>
        </h2>
      </motion.div>

      {/* Grille Principale (Texte vs Carte de Synthèse) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Colonne de gauche : Ton histoire et tes motivations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-7 space-y-6"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug">
            Étudiant en Génie Logiciel et orienté développement Backend.
          </h3>

          <div className="space-y-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
            <p>
              Je suis actuellement en Licence 3 après une formation en Informatique Développeur d&apos;Applications (IDA). Je recherche un{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100 bg-emerald-500/10 px-1.5 py-0.5 rounded text-emerald-600 dark:text-emerald-400">
                stage de 6 mois
              </strong>{" "}
              afin de mettre en pratique mes compétences, découvrir les méthodes de travail en entreprise et continuer à progresser aux côtés de développeurs expérimentés.
            </p>

            <p>
              À travers mes projets personnels et académiques, je travaille principalement avec{" "}
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Node.js, NestJS, TypeScript, Laravel, PostgreSQL et MySQL</strong>{" "}
              pour développer des applications web et des APIs REST. J&apos;aime particulièrement concevoir l&apos;architecture logicielle, structurer les bases de données et optimiser les performances.
            </p>

            <p>
              Rigoureux et passionné, je m&apos;intéresse de près aux bonnes pratiques de code propre (Clean Code), à la maintenabilité et à la sécurité des applications. Mon objectif est de m&aposinvestir pleinement dans des projets techniques stimulants.
            </p>
          </div>
        </motion.div>

        {/* Colonne de droite : Carte "Informations clés" stylisée */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="p-6 sm:p-8 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl shadow-xl shadow-emerald-500/5 space-y-6">
            <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-500 font-bold">
              // Aperçu rapide
            </h4>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0 mt-1">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Formation</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Licence 3 Génie Logiciel (BTS IDA validé)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0 mt-1">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Disponibilité</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Recherche stage de 6 mois</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Spécialité</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Backend & Architectures API</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200/60 dark:border-zinc-800">
              <span className="text-xs text-zinc-400 font-mono">Basé à Abidjan, Côte d&apos;Ivoire 🇨🇮</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Grid des points forts techniques (Bas de section) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
      >
        <div className="flex items-center gap-3 p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 hover:border-emerald-500/40 transition-all hover:-translate-y-1 shadow-sm">
          <Terminal className="w-5 h-5 text-emerald-500 shrink-0" />
          <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            APIs REST & NestJS
          </span>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 hover:border-emerald-500/40 transition-all hover:-translate-y-1 shadow-sm">
          <Database className="w-5 h-5 text-emerald-500 shrink-0" />
          <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            PostgreSQL & MySQL
          </span>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 hover:border-emerald-500/40 transition-all hover:-translate-y-1 shadow-sm">
          <Cpu className="w-5 h-5 text-emerald-500 shrink-0" />
          <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            TypeScript & Node.js
          </span>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 hover:border-emerald-500/40 transition-all hover:-translate-y-1 shadow-sm">
          <Layers className="w-5 h-5 text-emerald-500 shrink-0" />
          <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Next.js & Laravel
          </span>
        </div>
      </motion.div>
    </section>
  );
}