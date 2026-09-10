import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Récupérer le token depuis les cookies
  const token = request.cookies.get("admin_token")?.value;
  const { pathname } = request.nextUrl;

  // 1. Si l'utilisateur tente d'accéder au Dashboard sans token -> Redirection vers /admin/login
  if (pathname.startsWith("/admin/dashboard") && !token) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Si l'utilisateur est DÉJÀ connecté et essaie d'aller sur /admin/login -> Redirection vers le Dashboard
  if (pathname === "/admin/login" && token) {
    const dashboardUrl = new URL("/admin/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// Configurer les routes surveillées par le middleware
export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/login", "/admin/dashboard/messages"],
};