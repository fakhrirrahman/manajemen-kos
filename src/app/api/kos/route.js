import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  const koses = await prisma.kos.findMany({
    include: { owner: true, rooms: true },
  });
  console.log("Koses fetched:", koses); // Tambahkan ini
  return new Response(JSON.stringify(koses), { status: 200 });
}

export async function POST(request) {
  const data = await request.json();
  // data: { name, address, description, ownerId }
  const kos = await prisma.kos.create({
    data: {
      name: data.name,
      address: data.address,
      description: data.description,
      ownerId: data.ownerId,
    },
  });
  return new Response(JSON.stringify(kos), { status: 201 });
}
