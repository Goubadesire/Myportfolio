import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.role}`,
  description:
    "Portfolio de Désiré Gouba, développeur backend & full-stack : API REST robustes avec NestJS, bases de données PostgreSQL et applications Next.js.",
  keywords: ["Développeur Backend", "Full-Stack", "NestJS", "Node.js", "Next.js", "PostgreSQL", "Prisma", "TypeScript", "Abidjan"],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: "API robustes, données propres et applications web rapides.",
    type: "website",
    locale: "fr_FR",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>{children}</body>
    </html>
  );
}
