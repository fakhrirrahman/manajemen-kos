"use client";

import { useState } from "react";

export default function AddKos({ owners }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [ownerId, setOwnerId] = useState(
    owners.length > 0 ? owners[0].id : null
  );
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/kos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, address, description, ownerId }),
      });
      if (!res.ok) throw new Error("Failed to add kos");
      alert("Kos berhasil ditambahkan");
      setName("");
      setAddress("");
      setDescription("");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Tambah Kos Baru</h2>
      <input
        type="text"
        placeholder="Nama Kos"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Alamat"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <textarea
        placeholder="Deskripsi"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        value={ownerId}
        onChange={(e) => setOwnerId(Number(e.target.value))}
      >
        {owners.map((owner) => (
          <option key={owner.id} value={owner.id}>
            {owner.name}
          </option>
        ))}
      </select>
      <button type="submit" disabled={loading}>
        {loading ? "Menambahkan..." : "Tambah Kos"}
      </button>
    </form>
  );
}
