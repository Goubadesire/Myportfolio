"use client";

import { useTransition } from "react";
import { Check, Reply, RotateCcw, Trash2 } from "lucide-react";
import { deleteMessage, toggleRead } from "@/features/admin/actions";

const buttonClass =
  "flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-zinc-300 transition hover:text-white disabled:opacity-50";

export function MessageActions({ id, isRead, email }: { id: string; isRead: boolean; email: string }) {
  // useTransition donne un état « en cours » pendant l'appel à la Server Action.
  const [isPending, startTransition] = useTransition();

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <a href={`mailto:${email}`} className={buttonClass}>
        <Reply className="size-3.5" /> Répondre
      </a>
      <button
        type="button"
        disabled={isPending}
        onClick={() => startTransition(() => toggleRead(id, !isRead))}
        className={buttonClass}
      >
        {isRead ? <RotateCcw className="size-3.5" /> : <Check className="size-3.5" />}
        {isRead ? "Marquer non lu" : "Marquer lu"}
      </button>
      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          if (confirm("Supprimer définitivement ce message ?")) {
            startTransition(() => deleteMessage(id));
          }
        }}
        className={`${buttonClass} hover:border-red-500/40 hover:text-red-400`}
      >
        <Trash2 className="size-3.5" /> Supprimer
      </button>
    </div>
  );
}
