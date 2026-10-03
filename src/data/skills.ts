import type { IconType } from "react-icons";
import {
  SiExpress,
  SiGit,
  SiGithub,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiReact,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export type Skill = { name: string; icon: IconType; color: string };

export type SkillCategory = {
  title: string;
  description: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend & API",
    description: "APIs REST structurées, logique métier, authentification et validation.",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5fa04e" },
      { name: "NestJS", icon: SiNestjs, color: "#e0234e" },
      { name: "Express", icon: SiExpress, color: "#d4d4d8" },
      { name: "PHP", icon: SiPhp, color: "#8892bf" },
      { name: "Laravel", icon: SiLaravel, color: "#ff2d20" },
    ],
  },
  {
    title: "Données & ORM",
    description: "Modélisation relationnelle, migrations et requêtes propres.",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
      { name: "MySQL", icon: SiMysql, color: "#4479a1" },
      { name: "SQLite", icon: SiSqlite, color: "#5fa6d8" },
      { name: "Prisma", icon: SiPrisma, color: "#e4e4e7" },
    ],
  },
  {
    title: "Frontend",
    description: "Interfaces rapides et accessibles, du composant à la page.",
    skills: [
      { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
      { name: "React", icon: SiReact, color: "#61dafb" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38bdf8" },
    ],
  },
  {
    title: "Outils",
    description: "Versionnement, tests d'API et travail en équipe.",
    skills: [
      { name: "Git", icon: SiGit, color: "#f05032" },
      { name: "GitHub", icon: SiGithub, color: "#ffffff" },
      { name: "Postman", icon: SiPostman, color: "#ff6c37" },
    ],
  },
];

export const allSkills = skillCategories.flatMap((category) => category.skills);
