"use client";

import { useState } from "react";
import Link from "next/link";
import { Terminal, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Projets", href: "#projects" },
    { name: "Compétences", href: "#skills" },
    //{ name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200/60 dark:border-zinc-800/60 transition-all">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        
        {/* Logo avec Badge Actif */}
        <Link 
          href="/" 
          className="flex items-center gap-3 font-extrabold text-lg sm:text-xl text-zinc-900 dark:text-zinc-100 tracking-tight group"
        >
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 group-hover:scale-105 group-hover:bg-emerald-500/20 transition-all duration-300">
            <Terminal className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="leading-none">Désiré Gouba</span>
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