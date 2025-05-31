import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaBuilding, FaDoorOpen } from "react-icons/fa";

import {
  FiHome,
  FiUsers,
  FiFileText,
  FiChevronLeft,
  FiChevronRight,
  FiMenu,
} from "react-icons/fi";
// Perbaikan: Impor motion dari framer-motion dengan benar
import { motion } from "framer-motion";

export default function Sidebar({ open, setOpen, currentPath }) {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FiHome size={20} />,
      path: "/dashboard",
    },
    {
      name: "Manajemen Kos",
      icon: <FaBuilding size={20} />,
      path: "/dashboard/kos",
    },
    {
      name: "Manajemen Kamar",
      icon: <FaDoorOpen size={20} />,
      path: "/dashboard/rooms",
    },
    {
      name: "Manajemen Penyewa",
      icon: <FiUsers size={20} />,
      path: "/dashboard/users",
    },
    {
      name: "Manajemen Sewa",
      icon: <FiFileText size={20} />,
      path: "/dashboard/rentals",
    },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 z-50 ${
        open ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between h-16 border-b dark:border-gray-700 px-4">
          {open ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold text-gray-800 dark:text-white"
            >
              KosManager
            </motion.div>
          ) : (
            <div className="text-2xl text-gray-800 dark:text-white">
              <FaBuilding size={24} />
            </div>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            {open ? <FiChevronLeft size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                    pathname.startsWith(item.path)
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className={`${open ? "mr-3" : "mx-auto"}`}>
                    {item.icon}
                  </span>
                  {open && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Collapse Button - Bottom */}
        <div className="p-4 border-t dark:border-gray-700">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-center p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            {open ? (
              <>
                <FiChevronLeft className="mr-2" size={18} />
                <span>Collapse</span>
              </>
            ) : (
              <FiChevronRight size={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
