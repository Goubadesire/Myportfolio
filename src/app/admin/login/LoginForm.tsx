"use client";

import { useActionState } from "react";
import { Loader2, Lock } from "lucide-react";
import { ElectricBorder } from "@/components/effects/ElectricBorder";
import { login, type LoginState } from "@/features/admin/actions";

const inputClass =
  "w-full rounded-xl border border-line bg-ink/60 px-4 py-3 text-white placeholder:text-zinc-600 focus:border-volt/50 focus:outline-none focus:ring-2 focus:ring-volt/25";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(login, {});

  return (
    <ElectricBorder radius={24} active={isPending} className="relative w-full max-w-sm">
      <form action={formAction} className="space-y-5 rounded-3xl border border-line bg-surface p-8">
        <div className="text-center">
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-volt/10 text-volt">
            <Lock className="size-5" />
          </span>
          <h1 className="mt-4 text-xl font-semibold">Espace administration</h1>
          <p className="mt-1 text-sm text-zinc-500">Accès réservé.</p>
        </div>

        {state.error && (
          <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
            {state.error}
          </p>
        )}

        <input name="email" type="email" required placeholder="E-mail" autoComplete="email" className={inputClass} />
        <input
          name="password"
          type="password"
          required
          placeholder="Mot de passe"
          autoComplete="current-password"
          className={inputClass}
        />

        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-semibold text-ink transition hover:bg-volt disabled:opacity-60"
        >
          {isPending && <Loader2 className="size-4 animate-spin" />}
          Se connecter
        </button>
      </form>
    </ElectricBorder>
  );
}
