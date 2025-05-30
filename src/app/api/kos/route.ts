import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const koses = await prisma.kos.findMany({
      include: { owner: true, rooms: true },
    });
    return NextResponse.json(koses);
  } catch (error) {
    console.error("Error fetching kos:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data kos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, address, description, ownerId } = data;
    console.log("Incoming data:", data);

    if (!name || !address || !ownerId) {
      return NextResponse.json(
        { error: "name, address, dan ownerId wajib diisi" },
        { status: 400 }
      );
    }

    const kos = await prisma.kos.create({
      data: {
        name,
        address,
        description,
        ownerId: Number(ownerId),
      },
    });

    return NextResponse.json(kos, { status: 201 });
  } catch (error) {
    console.error("Error creating kos:", error);
    return NextResponse.json({ error: "Gagal membuat kos" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID kos wajib diisi" },
        { status: 400 }
      );
    }

    const kos = await prisma.kos.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(kos);
  } catch (error) {
    console.error("Error deleting kos:", error);
    return NextResponse.json({ error: "Gagal menghapus kos" }, { status: 500 });
  }
}
