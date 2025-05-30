"use client";

import { signIn } from "next-auth/react";

export default function OAuthButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => signIn("google")}
        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Google
      </button>
      <button
        type="button"
        onClick={() => signIn("github")}
        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        GitHub
      </button>
    </div>
  );
}
