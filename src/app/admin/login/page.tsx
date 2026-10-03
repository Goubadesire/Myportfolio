import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Connexion — Admin", robots: { index: false } };

export default function LoginPage() {
  return (
    <main className="relative flex min-h-svh items-center justify-center px-4">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-50" />
      <LoginForm />
    </main>
  );
}
