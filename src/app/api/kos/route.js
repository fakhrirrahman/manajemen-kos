import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(request) {
  try {
    const kosList = await prisma.kos.findMany({
      include: {
        owner: true, // Include owner details
        reviews: true, // Include reviews
      },
    });
    return NextResponse.json(kosList, { status: 200 });
  } catch (error) {
    console.error("Error fetching kos:", error);
    return NextResponse.json(
      { error: "Failed to fetch kos" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
export async function POST(request) {
  const { name, address, description, ownerId } = await request.json();

  if (!name || !address || !description || !ownerId) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const newKos = await prisma.kos.create({
      data: {
        name,
        address,
        description,
        ownerId,
      },
    });
    return NextResponse.json(newKos, { status: 201 });
  } catch (error) {
    console.error("Error creating kos:", error);
    return NextResponse.json(
      { error: "Failed to create kos" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


