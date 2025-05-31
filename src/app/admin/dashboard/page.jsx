"use client";
import { useState } from "react";
import KosCard from "@/components/KosCard";
import RoomStatusChart from "@/components/RoomStatusChart";
import RecentRentals from "@/components/RecentRentals";
import StatsCard from "@/components/StatsCard";
import "../../globals.css";
// Data dummy untuk simulasi
const dummyKosData = [
  {
    id: 1,
    name: "Kos Permata Hijau",
    address: "Jl. Permata Hijau No. 123, Jakarta Selatan",
    description: "Kos eksklusif dengan fasilitas lengkap dan keamanan 24 jam",
    rooms: [
      { id: 1, number: "A101", price: 1500000, status: "OCCUPIED" },
      { id: 2, number: "A102", price: 1400000, status: "AVAILABLE" },
      { id: 3, number: "A103", price: 1600000, status: "MAINTENANCE" },
    ],
  },
  {
    id: 2,
    name: "Kos Melati Indah",
    address: "Jl. Melati Indah No. 45, Jakarta Timur",
    description: "Kos nyaman dengan taman asri dan area bersantai",
    rooms: [
      { id: 4, number: "B201", price: 1200000, status: "AVAILABLE" },
      { id: 5, number: "B202", price: 1300000, status: "OCCUPIED" },
    ],
  },
];

const dummyRentals = [
  {
    id: 1,
    userName: "Andi Wijaya",
    roomNumber: "A101",
    startDate: "2023-05-15",
    endDate: "2024-05-14",
    kosName: "Kos Permata Hijau",
  },
  {
    id: 2,
    userName: "Budi Santoso",
    roomNumber: "B202",
    startDate: "2023-06-01",
    endDate: "2024-05-31",
    kosName: "Kos Melati Indah",
  },
];

export default function KosDashboard() {
  const [kosData, setKosData] = useState(dummyKosData);
  const [rentals, setRentals] = useState(dummyRentals);

  // Hitung statistik
  const totalKos = kosData.length;
  const totalRooms = kosData.reduce((acc, kos) => acc + kos.rooms.length, 0);
  const availableRooms = kosData.reduce(
    (acc, kos) =>
      acc + kos.rooms.filter((room) => room.status === "AVAILABLE").length,
    0
  );
  const occupiedRooms = kosData.reduce(
    (acc, kos) =>
      acc + kos.rooms.filter((room) => room.status === "OCCUPIED").length,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Kos</h1>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Kos"
          value={totalKos}
          icon="🏠"
          color="bg-blue-100"
        />
        <StatsCard
          title="Total Kamar"
          value={totalRooms}
          icon="🚪"
          color="bg-green-100"
        />
        <StatsCard
          title="Kamar Tersedia"
          value={availableRooms}
          icon="✅"
          color="bg-purple-100"
        />
        <StatsCard
          title="Kamar Terisi"
          value={occupiedRooms}
          icon="👤"
          color="bg-yellow-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daftar Kos */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Daftar Kos</h2>
          {kosData.map((kos) => (
            <KosCard
              key={kos.id}
              kos={kos}
              onEdit={() => console.log("Edit kos:", kos.id)}
              onDelete={() => console.log("Delete kos:", kos.id)}
            />
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Grafik Status Kamar */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Status Kamar
            </h2>
            <RoomStatusChart kosData={kosData} />
          </div>

          {/* Penyewaan Terbaru */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Penyewaan Terbaru
            </h2>
            <RecentRentals rentals={rentals} />
          </div>
        </div>
      </div>
    </div>
  );
}
