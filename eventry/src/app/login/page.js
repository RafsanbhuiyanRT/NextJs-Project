import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex items-center justify-center px-4">
      <div className="md:flex md:space-x-12 items-center w-full max-w-6xl">
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-blue-600 dark:text-blue-400 text-6xl font-bold">
            Eventry
          </h1>
          <p className="text-xl mt-4">
            Connect with friends and the world around you on Eventry.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md">
          <LoginForm />

          <div className="text-center my-4">
            <Link
              href="#"
              className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
            >
              Forgotten password
            </Link>
            <p>or</p>
            <Link
              href="/register"
              className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
            >
              Register
            </Link>
          </div>
          <hr className="my-4 border-gray-300 dark:border-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
