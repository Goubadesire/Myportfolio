"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import api from "@/lib/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      await api.post("/contact", formData);

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(
        err.response?.data?.message || "Une erreur s'est produite lors de l'envoi. Veuillez réessayer."
      );
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 border-t border-zinc-200 dark:border-zinc-800">
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Me Contacter
        </h2>
        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl font-normal leading-relaxed">
          Une opportunité de stage, un projet ou une question ? Envoyez-moi un message direct.
        </p>
      </div>

      <div className="p-8 sm:p-10 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label
                htmlFor="name"
                className="block text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-3"
              >
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Votre nom"
                className="w-full px-5 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base placeholder:text-zinc-400 dark:placeholder:text-zinc-600 shadow-xs"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-3"
              >
                Adresse e-mail
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="nom@entreprise.com"
                className="w-full px-5 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base placeholder:text-zinc-400 dark:placeholder:text-zinc-600 shadow-xs"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-3"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Votre message..."
              className="w-full px-5 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base placeholder:text-zinc-400 dark:placeholder:text-zinc-600 resize-none shadow-xs"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base transition-colors disabled:opacity-50 shadow-sm cursor-pointer"
          >
            {status === "loading" ? (
              "Envoi en cours..."
            ) : (
              <>
                <Send className="w-5 h-5" />
                Envoyer le message
              </>
            )}
          </button>

          {status === "success" && (
            <div className="flex items-center gap-3 p-5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-base font-medium">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
              <span>Message envoyé avec succès ! Je vous répondrai rapidement.</span>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-3 p-5 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 text-base font-medium">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}