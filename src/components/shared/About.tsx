"use client";

import { motion } from "framer-motion";
import { Terminal, Database, Cpu, Layers } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 border-t border-zinc-200/80 dark:border-zinc-800/80 relative">
      {/* Halo lumineux de fond */}
      <div className="absolute top-1/2 right-0 -z-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center md:text-left"
      >
        <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
          À Propos <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">de moi</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-4xl space-y-6"
      >
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug">
          Étudiant en Génie Logiciel et orienté développement Backend.
        </h3>

        <div className="space-y-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
          <p>
            Je suis actuellement en Licence 3 après une formation en Informatique
            Développeur d&apos;Applications (IDA). Je recherche un{" "}
            <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
              stage de 6 mois
            </strong>{" "}
            afin de mettre en pratique mes compétences, découvrir les méthodes de
            travail en entreprise et continuer à progresser aux côtés de
            développeurs expérimentés.
          </p>

          <p>
            À travers mes projets personnels et académiques, je travaille
            principalement avec <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
            Node.js, NestJS, TypeScript, Laravel, PostgreSQL et MySQL
            </strong>{" "}
            pour développer des applications web et des APIs REST. J&apos;aime
            particulièrement comprendre la logique derrière une application,
            travailler avec les bases de données et résoudre les problèmes
            rencontrés lors du développement.
          </p>

          <p>
            Je m&apos;intéresse également aux bonnes pratiques de développement,
            à la qualité du code et à la conception d&apos;applications
            maintenables. Mon objectif est de{" "}
            <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
              renforcer progressivement mon expertise backend
            </strong>{" "}
            et de construire une solide expérience professionnelle dans le
            développement logiciel.
          </p>
        </div>

        {/* Grid des points forts adaptatif (2x2 sur mobile/tablette, 4x1 sur grand écran) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <div className="flex items-center gap-3 p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:border-emerald-500/30 transition-colors">
            <Terminal className="w-5 h-5 text-emerald-500 shrink-0" />
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              APIs REST & NestJS
            </span>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:border-emerald-500/30 transition-colors">
            <Database className="w-5 h-5 text-emerald-500 shrink-0" />
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              PostgreSQL & MySQL
            </span>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:border-emerald-500/30 transition-colors">
            <Cpu className="w-5 h-5 text-emerald-500 shrink-0" />
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              TypeScript & Node.js
            </span>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:border-emerald-500/30 transition-colors">
            <Layers className="w-5 h-5 text-emerald-500 shrink-0" />
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Next.js & Laravel
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

