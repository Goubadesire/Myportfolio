"use client";

import { motion } from "framer-motion";
import { Server, Database, Code2, Wrench } from "lucide-react";
import {
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiPhp,
  SiLaravel,
  SiPostgresql,
  SiSqlite,
  SiPrisma,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiLinux,
  SiPostman,
  SiMysql,
} from "react-icons/si";

import { VscCode } from "react-icons/vsc";

interface SkillItem {
  name: string;
  icon: React.ElementType;
  color: string;
}

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Backend & API",
    icon: Server,
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "text-emerald-500" },
      { name: "NestJS", icon: SiNestjs, color: "text-red-500" },
      { name: "Express", icon: SiExpress, color: "text-zinc-400" },
      { name: "PHP", icon: SiPhp, color: "text-indigo-400" },
      { name: "Laravel", icon: SiLaravel, color: "text-red-600" },
    ],
  },
  {
    title: "Bases de données & ORM",
    icon: Database,
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-sky-500" },
      { name: "SQLite", icon: SiSqlite, color: "text-blue-400" },
      { name: "Mysql", icon: SiMysql, color: "text-blue-400" },
      { name: "Prisma ORM", icon: SiPrisma, color: "text-teal-400" },
    ],
  },
  {
    title: "Frontend & Intégration",
    icon: Code2,
    skills: [
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
      { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
      { name: "React", icon: SiReact, color: "text-cyan-400" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-zinc-100" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-500" },
    ],
  },
  {
    title: "Outils & Environnement",
    icon: Wrench,
    skills: [
      { name: "Git", icon: SiGit, color: "text-orange-500" },
      { name: "GitHub", icon: SiGithub, color: "text-zinc-200" },
      //{ name: "Linux (Ubuntu)", icon: SiLinux, color: "text-amber-500" },
      { name: "Postman", icon: SiPostman, color: "text-orange-600" },
      { name: "VS Code", icon: VscCode, color: "text-blue-500" },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 border-t border-zinc-200/80 dark:border-zinc-800/80 relative">
      <div className="absolute top-1/3 left-0 -z-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
          Compétences <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">Techniques</span>
        </h2>
        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mt-3 max-w-2xl font-normal leading-relaxed">
          Technologies, frameworks et outils avec lesquels je développe au quotidien.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SKILL_CATEGORIES.map((category, catIndex) => {
          const CategoryIcon = category.icon;
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="p-8 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 backdrop-blur-sm hover:border-emerald-500/40 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <CategoryIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => {
                  const SkillIcon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 group"
                    >
                      <SkillIcon className={`w-5 h-5 ${skill.color} transition-transform group-hover:scale-110`} />
                      <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}