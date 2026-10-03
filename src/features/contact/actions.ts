"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

// Remplace CreateContactDto + ValidationPipe de NestJS :
// le serveur reste la source de vérité, même si le formulaire a ses propres `required`.
const contactSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom.").max(100),
  email: z.email("Adresse e-mail invalide.").max(200),
  subject: z.string().trim().max(150).optional(),
  message: z.string().trim().min(10, "Votre message est un peu court (10 caractères minimum).").max(5000),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof z.infer<typeof contactSchema>, string>>;
  // React 19 vide le formulaire après chaque envoi : on renvoie la saisie
  // pour la réafficher quand il y a une erreur.
  values?: Record<"name" | "email" | "subject" | "message", string>;
};

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Champ invisible pour un humain : s'il est rempli, c'est un robot.
  // On répond « succès » pour ne pas lui indiquer qu'il a été détecté.
  if (formData.get("website")) {
    return { status: "success", message: "Message envoyé." };
  }

  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = contactSchema.safeParse({ ...values, subject: values.subject || undefined });

  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof NonNullable<ContactState["errors"]>;
      errors[field] ??= issue.message;
    }
    return { status: "error", message: "Certains champs sont à corriger.", errors, values };
  }

  try {
    await prisma.contactMessage.create({ data: parsed.data });
  } catch (error) {
    console.error("Échec de l'enregistrement du message", error);
    return { status: "error", message: "Le message n'a pas pu être envoyé. Réessayez dans un instant.", values };
  }

  return { status: "success", message: "Message envoyé. Je vous réponds très vite." };
}
