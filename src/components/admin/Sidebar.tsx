"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Mail, 
  LogOut, 
  ExternalLink, 
  Shield 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { removeToken } from "@/lib/auth";
import Cookies from "js-cookie";


const navigation = [
  { name: "Vue d'ensemble", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Projets", href: "/admin/dashboard/projects", icon: FolderKanban },
  { name: "Messages", href: "/admin/dashboard/messages", icon: Mail },
];

export default function AdminSidebar({ unreadCount = 0 }: { unreadCount?: number }) {
  const pathname = usePathname();
  const router = useRouter();

 const handleLogout = () => {
  localStorage.removeItem("token");
  Cookies.remove("admin_token", { path: "/" });
  router.push("/admin/login");
};

  return (
    <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col justify-between min-h-screen sticky top-0">
      <div>
        {/* Header Admin */}
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">Portfolio Admin</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Gestion de contenu</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.name === "Messages" && unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500 text-white">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Actions */}
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
        <Link href="/" target="_blank">
          <Button variant="outline" className="w-full justify-between rounded-xl text-xs font-medium">
            <span>Voir le site public</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-500/10 hover:text-red-700 dark:hover:text-red-300 rounded-xl text-xs font-medium gap-2"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </Button>
      </div>
    </aside>
  );
}