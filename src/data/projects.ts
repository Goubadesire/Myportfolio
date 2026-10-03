export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  challenge: string;
  approach: string;
  result: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
  // Couleur d'accent de la carte, utilisée pour le halo et la bordure électrique.
  accent: string;
};

// Les projets sont écrits dans le code : ils changent rarement,
// et une base de données ne serait utile que pour les modifier depuis l'admin.
export const projects: Project[] = [
  {
    slug: "velora",
    title: "Velora",
    tagline: "Tâches & Pomodoro — PWA",
    description:
      "Une application de gestion de tâches et de concentration inspirée de la méthode Pomodoro, pensée pour structurer le travail quotidien.",
    challenge:
      "Créer un outil utile pour organiser les tâches, gérer l'énergie et tenir une routine productive sans complexité excessive.",
    approach:
      "Un parcours utilisateur fluide, des interactions réactives et une base de données légère pour un usage quotidien, installable comme une app.",
    result:
      "Un produit personnel qui met en avant la productivité avec une expérience moderne et centrée sur l'utilisateur.",
    techStack: ["Next.js", "React", "Supabase", "TypeScript", "Tailwind CSS", "PWA"],
    githubUrl: "https://github.com/Goubadesire/velora.git",
    demoUrl: "https://velora-five-rust.vercel.app",
    image: "/velora.png",
    accent: "#5ee1ff",
  },
  {
    slug: "award-2ifgt",
    title: "2IFGT Award",
    tagline: "Plateforme de vote",
    description:
      "Plateforme de vote dynamique pour une grande école, conçue pour une gestion simple, sécurisée et rapide des votes et des résultats.",
    challenge:
      "Mettre en place une expérience de vote fiable avec un processus clair et une logique de résultats facile à suivre.",
    approach:
      "Une interface fluide, des données structurées et une logique de validation pour sécuriser la participation et l'exploitation des votes.",
    result:
      "Une solution en contexte réel, avec des enjeux de sécurité, d'organisation et de gestion des données.",
    techStack: ["Next.js", "React", "Supabase", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/Goubadesire/award2ifgt.git",
    demoUrl: "https://award2ifgt-final.vercel.app",
    accent: "#9b6bff",
  },
  {
    slug: "finance",
    title: "Finance App",
    tagline: "Suivi des dépenses",
    description:
      "Application de suivi et d'analyse des dépenses personnelles, pour mieux visualiser revenus et habitudes de consommation.",
    challenge:
      "Offrir un espace de suivi clair où l'on gère ses finances sans friction, avec des informations bien organisées.",
    approach:
      "Une interface de gestion simple et un traitement cohérent des données pour rendre les informations financières lisibles.",
    result:
      "Un projet qui met en valeur l'expérience utilisateur, le design d'interface et la logique de gestion de données.",
    techStack: ["Next.js", "React", "Supabase", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/Goubadesire/finance.git",
    demoUrl: "https://finance-ten-drab.vercel.app",
    accent: "#2f7bff",
  },
];
