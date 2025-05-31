"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormKos from "@/components/FormKos";

export default function CreateKosPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Data yang akan dikirim:", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/dashboard/kos");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Tambah Kos Baru</h1>
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
