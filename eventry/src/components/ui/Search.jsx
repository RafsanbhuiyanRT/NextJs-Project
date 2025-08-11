"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term) => {
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center bg-[#1F1F1F] border border-[#333] rounded-full overflow-hidden focus-within:border-[#6C63FF] transition duration-200">
        <div className="flex items-center justify-center w-12 h-10 bg-[#2A2C31] border-r border-[#333]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </div>

        <input
          type="text"
          placeholder=" Search events"
          className="flex-1 bg-[#1F1F1F] text-white text-sm px-4 py-2 placeholder-gray-400 focus:outline-none"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />

        <div className="flex items-center justify-center w-12 h-10 border-l border-[#333] cursor-pointer hover:bg-[#333] transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 14a3 3 0 003-3V5a3 3 0 10-6 0v6a3 3 0 003 3zm5-3a5 5 0 01-10 0H5a7 7 0 0014 0h-2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
