"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, ExternalLink, Code2, FolderKanban } from "lucide-react";
import api from "@/lib/api";
import AdminSidebar from "@/components/admin/Sidebar";
import ProjectDialog, { Project } from "@/components/admin/ProjectDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";



export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");
      setProjects(response.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des projets", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenCreate = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce projet ?")) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Gestion des Projets</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
              Créez, modifiez et gérez l&apos;ensemble des projets affichés sur votre portfolio.
            </p>
          </div>
          <Button
            onClick={handleOpenCreate}
            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 rounded-xl"
          >
            <Plus className="w-4 h-4" />
            Nouveau Projet
          </Button>
        </div>

        {/* Dynamic Project Table */}
        <Card className="rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 overflow-hidden">
          <CardHeader className="border-b border-zinc-200 dark:border-zinc-800 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-emerald-500" /> Liste des Projets ({projects.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center text-zinc-500 text-sm">Chargement des projets...</div>
            ) : projects.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-zinc-500 text-sm mb-4">Aucun projet trouvé dans la base de données.</p>
                <Button onClick={handleOpenCreate} variant="outline" className="rounded-xl">
                  Ajouter mon premier projet
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-200 dark:border-zinc-800">
                    <TableHead>Titre</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Technologies</TableHead>
                    <TableHead>Liens</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id} className="border-zinc-200 dark:border-zinc-800">
                      <TableCell className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {project.title}
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(project.techStack) ? (
                            project.techStack.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 text-[11px] rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium"
                              >
                                {tech}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-zinc-500">{project.techStack}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-zinc-400 hover:text-zinc-100 transition-colors"
                            >
                              <Code2 className="w-4 h-4" />
                            </a>
                          )}
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-zinc-400 hover:text-emerald-400 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleOpenEdit(project)}
                          className="h-8 w-8 p-0 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                          <Pencil className="w-4 h-4 text-zinc-400 hover:text-zinc-100" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => project.id && handleDelete(project.id)}
                          className="h-8 w-8 p-0 rounded-lg hover:bg-red-500/10 text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Dialog Modal pour Ajouter / Éditer */}
        <ProjectDialog
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchProjects}
          projectToEdit={selectedProject}
        />
      </main>
    </div>
  );
}