"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // 1. Import du composant Image de Next.js
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "À propos", href: "#about" },
    { name: "Projets", href: "#projects" },
    { name: "Approche", href: "#approach" },
    { name: "Compétences", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200/60 dark:border-zinc-800/60 transition-all">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        
        {/* Logo Image avec Badge Actif */}
        <Link 
          href="/" 
          className="flex items-center gap-3 group"
        >
          {/* Conteneur du Logo Image */}
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm group-hover:border-emerald-500/50 transition-all duration-300">
            <Image
              src="/logo.png" // Assure-toi que ton image est bien dans le dossier public/ sous ce nom (ex: public/logo.png)
              alt="Logo Désiré Gouba"
              fill
              sizes="(max-width: 68px) 40px, 44px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>

          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-lg text-zinc-900 dark:text-zinc-100 tracking-tight leading-none">
              Désiré Gouba
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-mono font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Backend / Full-Stack
              </span>
            </div>
          </div>
        </Link>

        {/* Liens de Navigation Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm sm:text-base font-semibold text-zinc-600 dark:text-zinc-400">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors py-1 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Actions à droite (ThemeToggle + Burger Button) */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Bouton Burger Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6 text-emerald-500" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Déroulant */}
      {isOpen && (
        <div className="md:hidden border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl px-6 py-6 transition-all">
          <nav className="flex flex-col gap-4 text-base font-semibold text-zinc-600 dark:text-zinc-400">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors py-2 border-b border-zinc-100 dark:border-zinc-900"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}