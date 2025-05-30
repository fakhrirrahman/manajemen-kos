"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FiMapPin, FiUser, FiHome } from "react-icons/fi";

export default function KosDetail() {
  const params = useParams();
  const id = params.id;

  const [kos, setKos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/kos/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil detail kos");
        return res.json();
      })
      .then((data) => {
        setKos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center py-20">Memuat...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">{kos.name}</h1>
      <div className="flex items-center text-gray-600 mb-2">
        <FiMapPin className="mr-2" />
        {kos.address}
      </div>
      <div className="flex items-center text-gray-600 mb-4">
        <FiUser className="mr-2" />
        Pemilik: {kos.owner?.name || "Tidak diketahui"}
      </div>
      <div className="bg-gray-100 p-6 rounded-lg">
        <p className="text-gray-800">
          {kos.description || "Tidak ada deskripsi."}
        </p>
      </div>
      <div className="mt-6">
        <span className="text-indigo-600 font-semibold text-xl">
          Mulai dari Rp500.000/bulan
        </span>
      </div>
    </div>
  );
}
