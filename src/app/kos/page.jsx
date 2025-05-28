"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHeart,
  FiMapPin,
  FiUser,
  FiHome,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";
import "../globals.css";

export default function KosList() {
  const [koses, setKoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/kos")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setKoses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching kos:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const filteredKoses = koses.filter(
    (kos) =>
      kos.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kos.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kos.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <FiLoader className="animate-spin text-4xl text-indigo-600" />
        <motion.span
          className="text-gray-600 text-lg"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
        >
          Memuat data kos...
        </motion.span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 p-4">
        <FiAlertCircle className="text-4xl text-red-500" />
        <h2 className="text-xl font-semibold text-gray-800">
          Gagal memuat data
        </h2>
        <p className="text-gray-600 text-center max-w-md">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Temukan Kos Impian Anda
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Jelajahi berbagai pilihan kos terbaik dengan fasilitas lengkap dan
          harga terjangkau
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Cari kos berdasarkan nama, lokasi, atau deskripsi..."
            className="w-full px-6 py-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </motion.div>

      {filteredKoses.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="mx-auto max-w-md">
            <FiHome className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Tidak ada kos yang ditemukan
            </h3>
            <p className="mt-2 text-gray-500">
              {searchTerm
                ? "Coba gunakan kata kunci lain atau hapus pencarian untuk melihat semua kos"
                : "Belum ada data kos yang tersedia saat ini"}
            </p>
          </div>
        </motion.div>
      ) : (
        <AnimatePresence>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredKoses.map((kos) => (
              <motion.div
                key={kos.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden border border-gray-100"
              >
                <div className="relative">
                  <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                    <FiHome className="text-white text-6xl opacity-30" />
                  </div>
                  <button
                    onClick={() => toggleFavorite(kos.id)}
                    className={`absolute top-4 right-4 p-2 rounded-full ${
                      favorites.has(kos.id)
                        ? "text-red-500 bg-white"
                        : "text-white bg-black bg-opacity-30"
                    }`}
                    aria-label="Favorite"
                  >
                    <FiHeart
                      className={`h-5 w-5 ${
                        favorites.has(kos.id) ? "fill-current" : ""
                      }`}
                    />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {kos.name}
                    </h2>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {kos.rooms.length} kamar
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3">
                    <FiMapPin className="mr-1.5 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{kos.address}</span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {kos.description || "Tidak ada deskripsi"}
                  </p>

                  <div className="flex items-center text-gray-600 mb-4">
                    <FiUser className="mr-1.5 h-4 w-4 flex-shrink-0" />
                    <span>Pemilik: {kos.owner?.name || "Tidak diketahui"}</span>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="text-indigo-600 font-medium">
                      Mulai dari <span className="text-2xl">Rp500.000</span>
                      /bulan
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                      Lihat Detail
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
