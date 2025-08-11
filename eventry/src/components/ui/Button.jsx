"use client";

export default function Button({ children }) {
  return (
    <button
      onClick={() => setShowRegister(true)}
      className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
    >
      {children}
    </button>
  );
}
