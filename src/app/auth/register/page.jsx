"use client";

import RegisterForm from "@/components/auth/RegisterForm";
import "../../globals.css";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Buat Akun</h1>
          <p className="text-gray-600 mt-2">
            Get started with your free account
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
