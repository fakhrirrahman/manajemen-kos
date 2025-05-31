'use client'
import Link from 'next/link'
import { useState } from 'react'
import DataTable from '@/components/DataTable'

const dummyKosData = [
  {
    id: 1,
    name: "Kos Permata Hijau",
    address: "Jl. Permata Hijau No. 123, Jakarta Selatan",
    description: "Kos eksklusif dengan fasilitas lengkap dan keamanan 24 jam",
    createdAt: "2023-01-15",
    updatedAt: "2023-05-20",
    roomsCount: 5
  },
  {
    id: 2,
    name: "Kos Melati Indah",
    address: "Jl. Melati Indah No. 45, Jakarta Timur",
    description: "Kos nyaman dengan taman asri dan area bersantai",
    createdAt: "2023-02-10",
    updatedAt: "2023-06-15",
    roomsCount: 3
  }
]

const columns = [
  { header: 'Nama Kos', accessor: 'name' },
  { header: 'Alamat', accessor: 'address' },
  { header: 'Jumlah Kamar', accessor: 'roomsCount' },
  { header: 'Tanggal Dibuat', accessor: 'createdAt' },
  { header: 'Terakhir Diupdate', accessor: 'updatedAt' },
]

export default function KosPage() {
  const [data, setData] = useState(dummyKosData)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = data.filter(kos =>
    kos.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kos.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id) => {
    setData(data.filter(kos => kos.id !== id))
    // Di sini nanti akan ada API call untuk delete
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Kos</h1>
        <Link
          href="/dashboard/kos/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Tambah Kos
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cari kos..."
            className="w-full md:w-1/2 p-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredData}
          detailHref="/dashboard/kos"
          editHref="/dashboard/kos"
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}