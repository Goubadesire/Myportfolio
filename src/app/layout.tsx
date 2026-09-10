import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ThemeProvider } from "@/components/shared/theme-provider";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio — Développeur Backend Node.js / NestJS",
  description: "Portfolio professionnel de Développeur Backend spécialisé en Node.js, NestJS, PHP et PostgreSQL.",
  keywords: [
    "Développeur Backend",
    "NestJS",
    "Node.js",
    "PostgreSQL",
    "Prisma",
    "TypeScript",
    "API REST",
  ],

  authors: [{ name: "Développeur Backend" }],
  openGraph: {
    title: "Portfolio — Développeur Backend Node.js & NestJS",
    description:
      "Conception d'API REST robustes, modélisation de bases de données et architectures scalables.",
    type: "website",
    locale: "fr_FR",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${jakartaSans.variable} ${jetbrainsMono.variable} font-sans antialiased bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen flex flex-col selection:bg-emerald-500/20 selection:text-emerald-500`}
      >
        <ThemeProvider
          attribute= "class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
