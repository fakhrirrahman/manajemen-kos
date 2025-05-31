"use client";
import Link from "next/link";
import { useState } from "react";
import DataTable from "@/components/DataTable";
import {
  FiPlus,
  FiSearch,
  FiHome,
  FiInfo,
  FiCalendar,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import "../../globals.css";

const dummyKosData = [
  {
    id: 1,
    name: "Kos Permata Hijau",
    address: "Jl. Permata Hijau No. 123, Jakarta Selatan",
    description: "Kos eksklusif dengan fasilitas lengkap dan keamanan 24 jam",
    createdAt: "2023-01-15",
    updatedAt: "2023-05-20",
    roomsCount: 5,
    status: "active",
  },
  {
    id: 2,
    name: "Kos Melati Indah",
    address: "Jl. Melati Indah No. 45, Jakarta Timur",
    description: "Kos nyaman dengan taman asri dan area bersantai",
    createdAt: "2023-02-10",
    updatedAt: "2023-06-15",
    roomsCount: 3,
    status: "active",
  },
];

const columns = [
  {
    header: "Nama Kos",
    accessor: "name",
    cell: (row) => (
      <div className="flex items-center">
        <FiHome className="mr-2 text-blue-500" />
        <span className="font-medium">{row.name}</span>
      </div>
    ),
  },
  {
    header: "Alamat",
    accessor: "address",
    cell: (row) => (
      <div className="text-gray-600 line-clamp-1">{row.address}</div>
    ),
  },
  {
    header: "Kamar",
    accessor: "roomsCount",
    cell: (row) => (
      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
        {row.roomsCount} Kamar
      </span>
    ),
  },
  {
    header: "Dibuat",
    accessor: "createdAt",
    cell: (row) => (
      <div className="flex items-center text-sm text-gray-500">
        <FiCalendar className="mr-1" />
        {row.createdAt}
      </div>
    ),
  },
  {
    header: "Diupdate",
    accessor: "updatedAt",
    cell: (row) => (
      <div className="flex items-center text-sm text-gray-500">
        <FiEdit2 className="mr-1" />
        {row.updatedAt}
      </div>
    ),
  },
];

export default function KosPage() {
  const [data, setData] = useState(dummyKosData);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter(
    (kos) =>
      kos.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kos.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setData(data.filter((kos) => kos.id !== id));
    // Di sini nanti akan ada API call untuk delete
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manajemen Kos</h1>
          <p className="text-gray-600">
            Kelola data kos dan kamar yang tersedia
          </p>
        </div>
        <Link
          href="/admin/kos/create"
          className="flex items-center px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg"
        >
          <FiPlus className="mr-2" />
          Tambah Kos Baru
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Kos</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {data.length}
              </h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FiHome className="text-blue-500 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Kamar</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {data.reduce((sum, kos) => sum + kos.roomsCount, 0)}
              </h3>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <FiInfo className="text-green-500 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Kos Aktif</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {data.filter((kos) => kos.status === "active").length}
              </h3>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <FiInfo className="text-purple-500 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari kos berdasarkan nama atau alamat..."
              className="pl-10 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Menampilkan</span>
            <span className="font-medium text-gray-700">
              {filteredData.length}
            </span>
            <span>dari</span>
            <span className="font-medium text-gray-700">{data.length}</span>
            <span>kos</span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <DataTable
            columns={columns}
            data={filteredData}
            detailHref="/dashboard/kos"
            editHref="/dashboard/kos"
            onDelete={handleDelete}
          />
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiHome className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">
              Tidak ada data kos
            </h3>
            <p className="text-gray-500 mt-1">
              {searchTerm
                ? "Hasil pencarian tidak ditemukan"
                : "Belum ada data kos yang terdaftar"}
            </p>
            {!searchTerm && (
              <Link
                href="/admin/kos/create"
                className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiPlus className="mr-2" />
                Tambah Kos Pertama
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
