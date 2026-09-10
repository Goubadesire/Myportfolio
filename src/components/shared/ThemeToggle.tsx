"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

const emptySubscribe = () => () => {};

function useISMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )
}

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isMounted = useISMounted();


  if (!isMounted) {
    return <div className="w-10 h-10" />;
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors relative overflow-hidden"
      aria-label="Changer de thème"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400" />
      ) : (
        <Moon className="w-5 h-5 text-zinc-700" />
      )}
    </motion.button>
  );
}