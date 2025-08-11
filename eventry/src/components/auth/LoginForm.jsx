"use client";

import { loginFormAction } from "@/action";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState("");
  const { setAuth } = useAuth();
  const router = useRouter();

  const loginFormHadler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const res = await loginFormAction(formData);
      console.log("The auth is", res);
      if (res?.userData) {
        setAuth(res?.userData);

        router.push("/");
      } else {
        setError(res?.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <div className="my-2 text-red-500">{error}</div>
      <form onSubmit={loginFormHadler}>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="w-full mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-1 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Log In
        </button>
      </form>
    </>
  );
}
