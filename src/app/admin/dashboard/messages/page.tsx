"use client";

import { useEffect, useState } from "react";
import { Mail, Trash2, CheckCircle2, Clock } from "lucide-react";
import api from "@/lib/api";
import AdminSidebar from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await api.get("/contact");
      setMessages(response.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des messages", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (id: string, currentStatus: boolean) => {
    try {
      await api.patch(`/contact/${id}`, { isRead: !currentStatus });
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, isRead: !currentStatus } : msg
        )
      );
    } catch (err) {
      console.error("Erreur lors du changement de statut", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce message ?")) return;
    try {
      await api.delete(`/contact/${id}`);
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Messages Reçus</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
              Consultez et gérez les opportunités et prises de contact depuis le portfolio.
            </p>
          </div>
        </div>

        <Card className="rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 overflow-hidden">
          <CardHeader className="border-b border-zinc-200 dark:border-zinc-800">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Mail className="w-5 h-5 text-emerald-500" /> Boîte de réception ({messages.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center text-zinc-500 text-sm">Chargement des messages...</div>
            ) : messages.length === 0 ? (
              <div className="p-12 text-center text-zinc-500 text-sm">
                Aucun message reçu pour le moment.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-200 dark:border-zinc-800">
                    <TableHead>Expéditeur</TableHead>
                    <TableHead>Sujet / Message</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.map((msg) => (
                    <TableRow key={msg.id} className="border-zinc-200 dark:border-zinc-800">
                      <TableCell>
                        <div className="font-semibold text-zinc-900 dark:text-zinc-100">{msg.name}</div>
                        <div className="text-xs text-zinc-500">{msg.email}</div>
                      </TableCell>
                      <TableCell className="max-w-md">
                        {msg.subject && (
                          <div className="font-medium text-xs text-emerald-500 mb-0.5">{msg.subject}</div>
                        )}
                        <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">
                          {msg.message}
                        </p>
                      </TableCell>
                      <TableCell>
                        {msg.isRead ? (
                          <Badge variant="secondary" className="rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                            Lu
                          </Badge>
                        ) : (
                          <Badge className="rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            Nouveau
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-zinc-500">
                        {new Date(msg.createdAt).toLocaleDateString("fr-FR")}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleToggleRead(msg.id, msg.isRead)}
                          className="h-8 w-8 p-0 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                          {msg.isRead ? (
                            <Clock className="w-4 h-4 text-zinc-400" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(msg.id)}
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
      </main>
    </div>
  );
}