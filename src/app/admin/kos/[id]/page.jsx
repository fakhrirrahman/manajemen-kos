"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const dummyKosData = {
  id: 1,
  name: "Kos Permata Hijau",
  address: "Jl. Permata Hijau No. 123, Jakarta Selatan",
  description: "Kos eksklusif dengan fasilitas lengkap dan keamanan 24 jam",
  createdAt: "2023-01-15",
  updatedAt: "2023-05-20",
  rooms: [
    { id: 1, number: "A101", price: 1500000, status: "OCCUPIED" },
    { id: 2, number: "A102", price: 1400000, status: "AVAILABLE" },
    { id: 3, number: "A103", price: 1600000, status: "MAINTENANCE" },
  ],
};

export default function KosDetailPage({ params }) {
  const router = useRouter();
  const [kos, setKos] = useState(dummyKosData);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus kos ini?")) return;

    setIsDeleting(true);
    try {
      console.log("Menghapus kos dengan ID:", params.id);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/dashboard/kos");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Detail Kos: {kos.name}
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Kembali
          </button>
          <Link
            href={`/dashboard/kos/${params.id}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400"
          >
            {isDeleting ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Informasi Umum
          </h2>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Nama Kos</p>
              <p className="font-medium">{kos.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Alamat</p>
              <p className="font-medium">{kos.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Deskripsi</p>
              <p className="font-medium">{kos.description}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tanggal Dibuat</p>
              <p className="font-medium">{kos.createdAt}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Terakhir Diupdate</p>
              <p className="font-medium">{kos.updatedAt}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Daftar Kamar
            </h2>
            <Link
              href={`/dashboard/rooms/create?kosId=${params.id}`}
              className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
            >
              Tambah Kamar
            </Link>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No. Kamar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Harga
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {kos.rooms.map((room) => (
                  <tr key={room.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {room.number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Rp {room.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          room.status === "AVAILABLE"
                            ? "bg-green-100 text-green-800"
                            : room.status === "OCCUPIED"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {room.status === "AVAILABLE"
                          ? "Tersedia"
                          : room.status === "OCCUPIED"
                          ? "Terisi"
                          : "Perbaikan"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Link
                        href={`/dashboard/rooms/${room.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Detail
                      </Link>
                      <Link
                        href={`/dashboard/rooms/${room.id}/edit`}
                        className="text-yellow-600 hover:text-yellow-900"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
