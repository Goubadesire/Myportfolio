import type { NextConfig } from "next";

// Plus d'`output: "export"` : le site tourne maintenant comme un serveur Node
// (Server Actions + Prisma), ce qu'un export HTML statique ne permet pas.
const nextConfig: NextConfig = {
  reactCompiler: true,
};

export default nextConfig;
