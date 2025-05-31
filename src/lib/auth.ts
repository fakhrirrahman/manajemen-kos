import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (
          credentials &&
          credentials.email === "admin@example.com" &&
          credentials.password === "password123"
        ) {
          return {
            id: "1",
            name: "Admin",
            email: "admin@example.com",
          };
        }
        // Jika gagal login, return null
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", // agar redirect tepat
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
