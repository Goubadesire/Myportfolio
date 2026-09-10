import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Génère le dossier HTML/CSS/JS statique lors du build
  images: {
    unoptimized: true, // Obligatoire pour l'export statique si tu utilises <Image /> de Next
  },
  reactCompiler: true,
};

export default nextConfig;
