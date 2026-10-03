"use client";

import { useActionState, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CheckCircle2, FileText, Loader2, Mail, Send } from "lucide-react";
import { SiGithub, SiWhatsapp } from "react-icons/si";
import { ElectricBorder } from "@/components/effects/ElectricBorder";
import { Reveal } from "@/components/effects/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { sendMessage, type ContactState } from "@/features/contact/actions";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };

const channels = [
  { label: "E-mail", value: site.email, href: `mailto:${site.email}`, icon: Mail },
  { label: "WhatsApp", value: "Discuter directement", href: site.whatsapp, icon: SiWhatsapp },
  { label: "GitHub", value: "Voir mon code", href: site.github, icon: SiGithub },
  { label: "CV", value: "Télécharger le PDF", href: site.cv, icon: FileText },
];

function Field({
  label,
  name,
  error,
  textarea,
  ...props
}: {
  label: string;
  name: string;
  error?: string;
  textarea?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const className = cn(
    "w-full rounded-xl border bg-ink/60 px-4 py-3 text-[15px] text-white placeholder:text-zinc-600 transition focus:outline-none focus:ring-2",
    error ? "border-red-500/60 focus:ring-red-500/40" : "border-line focus:border-volt/50 focus:ring-volt/25",
  );

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-zinc-300">{label}</span>
      {textarea ? (
        <textarea name={name} rows={5} className={cn(className, "resize-none")} aria-invalid={!!error} {...props} />
      ) : (
        <input name={name} className={className} aria-invalid={!!error} {...props} />
      )}
      {error && <span className="mt-1.5 block text-sm text-red-400">{error}</span>}
    </label>
  );
}

function ContactForm({ onReset }: { onReset: () => void }) {
  // useActionState appelle la Server Action et garde sa dernière réponse (state).
  // isPending est vrai pendant l'envoi : pas besoin de gérer un « loading » à la main.
  const [state, formAction, isPending] = useActionState(sendMessage, initialState);
  const [focused, setFocused] = useState(false);

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-105 flex-col items-center justify-center rounded-[28px] border border-volt/30 bg-surface p-10 text-center"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-volt/10 text-volt glow-volt">
          <CheckCircle2 className="size-8" />
        </span>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight">Message bien reçu.</h3>
        <p className="mt-2 text-zinc-400">{state.message}</p>
        <button
          type="button"
          onClick={onReset}
          className="mt-8 rounded-full border border-line px-5 py-2.5 text-sm text-zinc-300 transition hover:border-white/30 hover:text-white"
        >
          Envoyer un autre message
        </button>
      </motion.div>
    );
  }

  return (
    <ElectricBorder active={focused || isPending} radius={28}>
      <form
        action={formAction}
        onFocus={() => setFocused(true)}
        onBlur={(event) => {
          // On ne coupe le courant que si le focus quitte vraiment le formulaire.
          if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
        }}
        className="space-y-5 rounded-[28px] border border-line bg-surface p-6 sm:p-8"
        noValidate
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Nom complet"
            name="name"
            placeholder="Votre nom"
            autoComplete="name"
            required
            defaultValue={state.values?.name}
            error={state.errors?.name}
          />
          <Field
            label="E-mail"
            name="email"
            type="email"
            placeholder="nom@entreprise.com"
            autoComplete="email"
            required
            defaultValue={state.values?.email}
            error={state.errors?.email}
          />
        </div>
        <Field
          label="Sujet (facultatif)"
          name="subject"
          placeholder="Stage, projet, question…"
          defaultValue={state.values?.subject}
          error={state.errors?.subject}
        />
        <Field
          label="Message"
          name="message"
          textarea
          placeholder="Parlez-moi de votre besoin…"
          required
          defaultValue={state.values?.message}
          error={state.errors?.message}
        />

        {/* Pot de miel anti-spam : caché aux humains, rempli par les robots. */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

        <AnimatePresence>
          {state.status === "error" && state.message && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="alert"
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {state.message}
            </motion.p>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={isPending}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-volt disabled:opacity-60 sm:w-auto"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Envoi en cours…
            </>
          ) : (
            <>
              <Send className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              Envoyer le message
            </>
          )}
        </button>
      </form>
    </ElectricBorder>
  );
}

export function Contact() {
  // Changer la clé recrée le formulaire : son état repart de zéro.
  const [formKey, setFormKey] = useState(0);

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-150 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(47,123,255,0.14),transparent_65%)] blur-3xl"
      />

      <div className="grid gap-16 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title={
              <>
                Un stage, un projet ? <span className="text-electric">Parlons-en.</span>
              </>
            }
            description="Une opportunité, une question ou simplement un retour sur mon travail : écrivez-moi, je réponds rapidement."
          />

          <ul className="mt-10 space-y-3">
            {channels.map(({ label, value, href, icon: Icon }, index) => (
              <li key={label}>
                <Reveal delay={0.05 * index}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-surface/60 p-4 transition hover:border-volt/30 hover:bg-surface"
                  >
                    <span className="flex size-10 items-center justify-center rounded-xl bg-white/5 text-zinc-300 transition group-hover:bg-volt/10 group-hover:text-volt">
                      <Icon className="size-4.5" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{label}</span>
                      <span className="block text-sm text-zinc-200">{value}</span>
                    </span>
                    <ArrowUpRight className="size-4 text-zinc-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-volt" />
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <ContactForm key={formKey} onReset={() => setFormKey((key) => key + 1)} />
        </Reveal>
      </div>
    </section>
  );
}
