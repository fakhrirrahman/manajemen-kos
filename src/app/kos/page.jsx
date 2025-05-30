"use client";

import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import "../globals.css";

export default function AdminKosManager() {
  const [koses, setKoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", address: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchKoses();
  }, []);

  const fetchKoses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/kos");
      const data = await res.json();
      setKoses(data);
    } catch (err) {
      console.error("Gagal memuat data kos", err);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `/api/kos/${editId}` : "/api/kos";

    try {
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      setForm({ name: "", address: "", description: "" });
      setIsEditing(false);
      setEditId(null);
      fetchKoses();
    } catch (err) {
      console.error("Gagal menyimpan data:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus kos ini?")) return;
    try {
      await fetch(`/api/kos/${id}`, { method: "DELETE" });
      fetchKoses();
    } catch (err) {
      console.error("Gagal menghapus:", err);
    }
  };

  const handleEdit = (kos) => {
    setForm({
      name: kos.name,
      address: kos.address,
      description: kos.description,
    });
    setIsEditing(true);
    setEditId(kos.id);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-indigo-600">
        Manajemen Data Kos
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input
          type="text"
          placeholder="Nama Kos"
          className="w-full border px-4 py-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Alamat"
          className="w-full border px-4 py-2 rounded"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
        />
        <textarea
          placeholder="Deskripsi"
          className="w-full border px-4 py-2 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          {isEditing ? "Update Kos" : "Tambah Kos"}
        </button>
      </form>

      <div className="space-y-4">
        {loading ? (
          <p>Memuat data...</p>
        ) : (
          koses.map((kos) => (
            <div
              key={kos.id}
              className="border p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg">{kos.name}</h3>
                <p className="text-gray-500">{kos.address}</p>
                <p className="text-sm text-gray-400">
                  {kos.description || "Tidak ada deskripsi"}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(kos)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDelete(kos.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
