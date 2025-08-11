import { registerFormAction } from "@/action";

export default function RegisterForm() {
  return (
    <form action={registerFormAction}>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        className="w-full mb-4 px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="username"
        id="username"
        placeholder="@Username"
        className="w-full mb-4 px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter email"
        className="w-full mb-4 px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        name="password"
        id="password"
        placeholder="New password"
        className="w-full mb-4 px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm password"
        className="w-full mb-4 px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-1 rounded-md font-semibold hover:bg-green-700 transition"
      >
        Sign Up
      </button>
    </form>
  );
}
