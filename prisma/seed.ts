import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

// Les identifiants viennent du .env : un mot de passe écrit en dur
// dans le code finirait sur GitHub.
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  throw new Error("ADMIN_EMAIL et ADMIN_PASSWORD doivent être définis dans .env");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  const passwordHash = await bcrypt.hash(password!, 10);

  await prisma.user.upsert({
    where: { email: email! },
    update: { password: passwordHash },
    create: { email: email!, password: passwordHash },
  });

  console.log(`Compte admin prêt : ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
