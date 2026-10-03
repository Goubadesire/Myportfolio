"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession, requireAdmin } from "@/lib/session";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // Même message dans tous les cas : on ne révèle pas si l'email existe.
  const invalid = { error: "Identifiants incorrects." };
  if (!parsed.success) return invalid;

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user) return invalid;

  const isPasswordValid = await bcrypt.compare(parsed.data.password, user.password);
  if (!isPasswordValid) return invalid;

  await createSession(user.id);
  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}

export async function toggleRead(id: string, isRead: boolean) {
  await requireAdmin();
  await prisma.contactMessage.update({ where: { id }, data: { isRead } });
  revalidatePath("/admin");
}

export async function deleteMessage(id: string) {
  await requireAdmin();
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin");
}
