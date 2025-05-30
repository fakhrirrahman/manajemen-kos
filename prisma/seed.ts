import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("user123", 10);

  // Buat Admin
  await prisma.user.upsert({
    where: { email: "admin@kos.com" },
    update: {},
    create: {
      name: "Admin Kos",
      email: "admin@kos.com",
      password: adminPassword,
      role: "ADMIN",
      updatedAt: new Date(),
    },
  });

  // Buat User Biasa
  await prisma.user.upsert({
    where: { email: "user@kos.com" },
    update: {},
    create: {
      name: "User Kos",
      email: "user@kos.com",
      password: userPassword,
      role: "USER",
      updatedAt: new Date(),
    },
  });
}

main()
  .then(() => {
    console.log("Seeder berhasil dijalankan.");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
