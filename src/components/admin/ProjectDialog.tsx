"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";

export interface Project {
  id?: string;
  title: string;
  slug?: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  isFeatured?: boolean;
  order?: number;
}

interface ProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  projectToEdit?: Project | null;
}

export default function ProjectDialog({
  isOpen,
  onClose,
  onSuccess,
  projectToEdit,
}: ProjectDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    techStack: "",
    githubUrl: "",
    demoUrl: "",
    isFeatured: false,
    order: 0,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Générer automatiquement le slug à partir du titre
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      // Met à jour le slug automatiquement si l'utilisateur ne l'a pas modifié manuellement
      slug: generateSlug(title),
    }));
  };

  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        title: projectToEdit.title || "",
        slug: projectToEdit.slug || "",
        description: projectToEdit.description || "",
        techStack: Array.isArray(projectToEdit.techStack)
          ? projectToEdit.techStack.join(", ")
          : "",
        githubUrl: projectToEdit.githubUrl || "",
        demoUrl: projectToEdit.demoUrl || "",
        isFeatured: projectToEdit.isFeatured || false,
        order: projectToEdit.order || 0,
      });
    } else {
      setFormData({
        title: "",
        slug: "",
        description: "",
        techStack: "",
        githubUrl: "",
        demoUrl: "",
        isFeatured: false,
        order: 0,
      });
    }
    setErrorMessage("");
  }, [projectToEdit, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const techArray = formData.techStack
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    // Pratique : Ne transmettre au payload que les champs valides
    const payload: Record<string, any> = {
      title: formData.title,
      slug: formData.slug || generateSlug(formData.title),
      description: formData.description,
      techStack: techArray,
      isFeatured: formData.isFeatured,
      order: Number(formData.order) || 0,
    };

    if (formData.githubUrl.trim()) payload.githubUrl = formData.githubUrl.trim();
    if (formData.demoUrl.trim()) payload.demoUrl = formData.demoUrl.trim();

    try {
      if (projectToEdit?.id) {
        await api.patch(`/projects/${projectToEdit.id}`, payload);
      } else {
        await api.post("/projects", payload);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Erreur serveur :", err.response?.data);
      const msg = err.response?.data?.message;
      setErrorMessage(
        Array.isArray(msg) ? msg.join(" | ") : msg || "Une erreur est survenue."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] rounded-2xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {projectToEdit ? "Modifier le Projet" : "Ajouter un Nouveau Projet"}
          </DialogTitle>
        </DialogHeader>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 block">
                Titre *
              </label>
              <Input
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Mon Super Projet"
                className="rounded-xl border-zinc-200 dark:border-zinc-800"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 block">
                Slug *
              </label>
              <Input
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="mon-super-projet"
                className="rounded-xl border-zinc-200 dark:border-zinc-800 font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 block">
              Technologies (séparées par une virgule) *
            </label>
            <Input
              required
              value={formData.techStack}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              placeholder="Next.js, NestJS, PostgreSQL"
              className="rounded-xl border-zinc-200 dark:border-zinc-800"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 block">
              Description *
            </label>
            <Textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description détaillée de l'application..."
              className="rounded-xl border-zinc-200 dark:border-zinc-800 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 block">
                Lien GitHub
              </label>
              <Input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/mon-repo"
                className="rounded-xl border-zinc-200 dark:border-zinc-800"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 block">
                Lien Démo Live
              </label>
              <Input
                type="url"
                value={formData.demoUrl}
                onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                placeholder="https://mon-projet.com"
                className="rounded-xl border-zinc-200 dark:border-zinc-800"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              Mettre en avant (Featured)
            </label>

            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Ordre :
              </label>
              <Input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-20 rounded-xl border-zinc-200 dark:border-zinc-800 h-9"
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
            >
              {loading ? "Enregistrement..." : projectToEdit ? "Mettre à jour" : "Créer le projet"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}