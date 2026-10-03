import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET manquant dans .env");
  return new TextEncoder().encode(secret);
}

export async function verifySessionToken(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.sub ? { userId: payload.sub } : null;
  } catch {
    // Token expiré, modifié ou signé avec un autre secret.
    return null;
  }
}

export async function createSession(userId: string) {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecret());

  // httpOnly : le JavaScript du navigateur ne peut pas lire le cookie,
  // contrairement à l'ancien token stocké dans localStorage.
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

// Le proxy redirige déjà les visiteurs non connectés, mais chaque page
// et chaque Server Action admin revérifie : une Server Action peut être
// appelée directement, sans passer par la page.
export async function requireAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);
  if (!session) redirect("/admin/login");
  return session;
}
