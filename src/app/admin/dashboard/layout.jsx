"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import "../../globals.css";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        currentPath={pathname}
      />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Hamburger kiri */}
            <div className="flex items-center"></div>

            {/* Admin kanan */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Admin</span>
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
