"use client";
import Link from "next/link";
import { useState } from "react";
import DataTable from "@/components/DataTable";

const dummyRoomData = [
  {
    id: 1,
    number: "A101",
    price: 1500000,
    status: "OCCUPIED",
    kosName: "Kos Permata Hijau",
    createdAt: "2023-01-15",
  },
  {
    id: 2,
    number: "A102",
    price: 1400000,
    status: "AVAILABLE",
    kosName: "Kos Permata Hijau",
    createdAt: "2023-01-16",
  },
];

const columns = [
  { header: "No. Kamar", accessor: "number" },
  { header: "Harga", accessor: "price" },
  { header: "Status", accessor: "status" },
  { header: "Nama Kos", accessor: "kosName" },
  { header: "Tanggal Dibuat", accessor: "createdAt" },
];

export default function RoomsPage() {
  const [data, setData] = useState(dummyRoomData);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter(
    (room) =>
      room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.kosName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setData(data.filter((room) => room.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Kamar</h1>
        <Link
          href="/dashboard/rooms/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Tambah Kamar
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cari kamar..."
            className="w-full md:w-1/2 p-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredData}
          detailHref="/dashboard/rooms"
          editHref="/dashboard/rooms"
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
