import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
