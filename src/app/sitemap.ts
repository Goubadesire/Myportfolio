// src/app/sitemap.ts (ou route.ts)

export const dynamic = "force-static"; // 👈 Ajoute cette ligne pour l'export statique

import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://goubadesire.com"; // Remplace par ton vrai domaine

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Tes autres routes statiques si tu en as
  ];
}