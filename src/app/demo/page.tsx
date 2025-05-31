import React from 'react';
import '../globals.css';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Live Demo: Sistem Manajemen Kosan
        </h1>
        <p className="text-gray-700 mb-8">
          Ini adalah pratinjau sistem untuk mengelola kosan, termasuk fitur input penyewa,
          status kamar, dan laporan pembayaran.
        </p>

        {/* Section 1: Tambah Penyewa */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">📝 Tambah Penyewa</h2>
          <p className="text-gray-600 mb-4">
            Masukkan informasi penyewa baru untuk mencatat siapa yang tinggal di kamar.
          </p>
         <form className="space-y-4">
          <input
            type="text"
            placeholder="Nama Penyewa"
            className="w-full border border-gray-300 p-2 rounded text-black"
          />
          <input
            type="text"
            placeholder="Nomor Kamar"
            className="w-full border border-gray-300 p-2 rounded text-black"
          />
          <input
            type="text"
            placeholder="Nomor HP"
            className="w-full border border-gray-300 p-2 rounded text-black"
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            Simpan Data
          </button>
        </form>
        </div>

        {/* Section 2: Status Kamar */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🏠 Status Kamar</h2>
          <p className="text-gray-600 mb-4">
            Berikut adalah status kamar kosan saat ini.
          </p>
          <ul className="space-y-2">
            <li className="border border-gray-200 p-4 rounded shadow-sm flex justify-between">
              <span className='text-black '>Kamar 101</span>
              <span className="text-green-600 font-medium">Terisi</span>
            </li>
            <li className="border border-gray-200 p-4 rounded shadow-sm flex justify-between">
              <span className='text-black'>Kamar 102</span>
              <span className="text-red-600 font-medium">Kosong</span>
            </li>
          </ul>
        </div>

        {/* Section 3: Statistik Pembayaran */}
        <div className="bg-indigo-50 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-indigo-800 mb-2">📊 Statistik Pembayaran</h2>
          <p className="text-indigo-600 text-lg">
            Total Penyewa Aktif: <strong>12</strong>
          </p>
          <p className="text-indigo-600 text-lg">
            Pembayaran Bulan Ini: <strong>Rp 6.500.000</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
