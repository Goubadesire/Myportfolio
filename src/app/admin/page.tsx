import type { Metadata } from "next";
import Link from "next/link";
import { LogOut, Mail } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { logout } from "@/features/admin/actions";
import { cn } from "@/lib/utils";
import { MessageActions } from "./MessageActions";

export const metadata: Metadata = { title: "Messages — Admin", robots: { index: false } };

type Filter = "all" | "unread";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ filter?: string }> }) {
  await requireAdmin();
  const filter: Filter = (await searchParams).filter === "unread" ? "unread" : "all";

  // Plus besoin d'appel HTTP vers une API : la page est rendue sur le serveur
  // et lit directement la base avec Prisma.
  const [messages, unreadCount] = await Promise.all([
    prisma.contactMessage.findMany({
      where: filter === "unread" ? { isRead: false } : undefined,
      orderBy: { createdAt: "desc" },
    }),
    prisma.contactMessage.count({ where: { isRead: false } }),
  ]);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Messages</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {unreadCount} non lu{unreadCount > 1 ? "s" : ""} · reçus depuis le formulaire du portfolio
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className="rounded-full border border-line px-4 py-2 text-sm text-zinc-300 hover:text-white">
            Voir le site
          </Link>
          <form action={logout}>
            <button className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-zinc-300 hover:text-white">
              <LogOut className="size-4" /> Déconnexion
            </button>
          </form>
        </div>
      </header>

      <nav className="mt-8 flex gap-2">
        {(
          [
            ["all", "Tous"],
            ["unread", `Non lus (${unreadCount})`],
          ] as const
        ).map(([value, label]) => (
          <Link
            key={value}
            href={value === "all" ? "/admin" : "/admin?filter=unread"}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm transition",
              filter === value ? "bg-white text-ink" : "border border-line text-zinc-400 hover:text-white",
            )}
          >
            {label}
          </Link>
        ))}
      </nav>

      {messages.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-line p-16 text-center text-zinc-500">
          <Mail className="mx-auto size-6" />
          <p className="mt-3">Aucun message pour le moment.</p>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {messages.map((message) => (
            <li
              key={message.id}
              className={cn(
                "rounded-2xl border bg-surface p-5 transition",
                message.isRead ? "border-line" : "border-volt/30 shadow-[0_0_30px_-15px_rgba(94,225,255,0.6)]",
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 font-medium">
                    {!message.isRead && <span className="size-2 rounded-full bg-volt" aria-label="Non lu" />}
                    {message.name}
                  </p>
                  <a href={`mailto:${message.email}`} className="text-sm text-volt hover:underline">
                    {message.email}
                  </a>
                </div>
                <time className="text-xs text-zinc-500" dateTime={message.createdAt.toISOString()}>
                  {message.createdAt.toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" })}
                </time>
              </div>
              {message.subject && <p className="mt-3 text-sm font-medium text-zinc-200">{message.subject}</p>}
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-zinc-400">{message.message}</p>
              <MessageActions id={message.id} isRead={message.isRead} email={message.email} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
