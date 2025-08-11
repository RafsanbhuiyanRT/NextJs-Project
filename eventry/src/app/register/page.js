import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

const registerPage = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4 text-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create a new account
        </h2>
        <RegisterForm />
        <div className="text-center">
          <Link
            href="/login"
            className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
          >
            Already have an accoutn?
          </Link>
        </div>
      </div>
    </div>
  );
};
export default registerPage;
