"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import "../globals.css";

export default function DashboardLayoutClient({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        currentPath={pathname}
      />

      {/* Overlay untuk sidebar mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm z-50 relative">
          <div className="flex items-center px-6 py-4">
            {/* Hamburger kiri */}
            <div className="lg:hidden">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-600 focus:outline-none"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

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
