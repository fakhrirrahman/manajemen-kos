"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormKos from "@/components/FormKos";

const dummyKosData = {
  id: 1,
  name: "Kos Permata Hijau",
  address: "Jl. Permata Hijau No. 123, Jakarta Selatan",
  description: "Kos eksklusif dengan fasilitas lengkap dan keamanan 24 jam",
};

export default function EditKosPage({ params }) {
  const router = useRouter();
  const [formData, setFormData] = useState(dummyKosData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulasi API call
    try {
      console.log("Data yang akan diupdate:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push(`/dashboard/kos/${params.id}`);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Edit Kos</h1>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Kembali
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <FormKos
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
