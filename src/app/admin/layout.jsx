import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // pastikan path ke authOptions benar
import { redirect } from "next/navigation";
import DashboardLayoutClient from "./DashboardLayoutClient"; // pastikan path benar

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
