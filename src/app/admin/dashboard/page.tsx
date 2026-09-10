"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FolderKanban, 
  Mail, 
  Clock, 
  Plus, 
  CheckCircle2, 
  Trash2, 
  Eye 
} from "lucide-react";
import api from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import AdminSidebar from "@/components/admin/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [resMessages, resProjects] = await Promise.all([
          api.get("/contact"),
          api.get("/projects"),
        ]);
        setMessages(resMessages.data);
        setProjects(resProjects.data);
      } catch (err) {
        console.error("Erreur lors du chargement des données", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleDeleteMessage = async (id: string) => {
    try {
      await api.delete(`/contact/${id}`);
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (err) {
      console.error("Erreur lors de la suppression", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-400">
        Chargement du dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <AdminSidebar unreadCount={messages.length} />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Tableau de Bord</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
              Aperçu général de vos projets et requêtes reçues.
            </p>
          </div>
          <Button
            onClick={() => router.push("/admin/dashboard/projects/new")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 rounded-xl"
          >
            <Plus className="w-4 h-4" />
            Nouveau Projet
          </Button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Total Projets
              </CardTitle>
              <FolderKanban className="w-5 h-5 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold">{projects.length}</div>
              <p className="text-xs text-zinc-500 mt-1">Projets publiés sur le site</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Messages Reçus
              </CardTitle>
              <Mail className="w-5 h-5 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold">{messages.length}</div>
              <p className="text-xs text-zinc-500 mt-1">Demandes de contact directes</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Statut Serveur
              </CardTitle>
              <Clock className="w-5 h-5 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 px-3 py-1 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> En ligne (NestJS)
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section Messages */}
        <Card className="rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 overflow-hidden">
          <CardHeader className="border-b border-zinc-200 dark:border-zinc-800">
            <CardTitle className="text-lg font-bold">Derniers Messages</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {messages.length === 0 ? (
              <div className="p-8 text-center text-zinc-500 text-sm">
                Aucun message reçu pour le moment.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-200 dark:border-zinc-800">
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.map((msg) => (
                    <TableRow key={msg.id} className="border-zinc-200 dark:border-zinc-800">
                      <TableCell className="font-medium">{msg.name}</TableCell>
                      <TableCell className="text-zinc-500 dark:text-zinc-400">{msg.email}</TableCell>
                      <TableCell className="text-zinc-500 dark:text-zinc-400 text-xs">
                        {new Date(msg.createdAt).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedMessage(msg)}
                          className="h-8 w-8 p-0 rounded-lg"
                        >
                          <Eye className="w-4 h-4 text-zinc-400 hover:text-zinc-100" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteMessage(msg.id)}
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

        {/* Modal pour lire un message complet */}
        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="rounded-2xl bg-zinc-900 border-zinc-800 text-zinc-100 max-w-lg">
            {selectedMessage && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">{selectedMessage.name}</DialogTitle>
                  <DialogDescription className="text-emerald-400 text-xs">
                    {selectedMessage.email}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
                <div className="mt-4 flex justify-between items-center text-xs text-zinc-500">
                  <span>
                    Reçu le : {new Date(selectedMessage.createdAt).toLocaleString("fr-FR")}
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                    className="rounded-xl"
                  >
                    Supprimer
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}