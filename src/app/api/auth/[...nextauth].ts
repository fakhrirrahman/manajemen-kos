import NextAuth, { NextAuthOptions, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

// Custom tipe JWT, menambahkan role
interface CustomJWT extends JWT {
  role?: string;
}

// Custom tipe Session, user memiliki properti role juga
interface CustomSession extends Session {
  user: Session["user"] & {
    role?: string;
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password harus diisi");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("User tidak ditemukan");

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) throw new Error("Password salah");

        // Kembalikan user object dengan properti yang ingin disimpan di token/session
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, // pastikan ada di DB
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }: { token: CustomJWT; user?: User }) {
      // Saat user login, tambahkan role ke token JWT
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      // Pastikan session.user ada dan berikan role dari token
      if (session.user && token.role) {
        (session.user as typeof session.user & { role?: string }).role =
          token.role as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
