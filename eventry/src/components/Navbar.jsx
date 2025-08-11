"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginOut from "./auth/LoginOut";
import Search from "./ui/Search";

export default function Navbar() {
  const pathName = usePathname();

  return (
    <nav className="bg-black">
      <div className="container  flex justify-between items-center py-4 ">
        <div className="nav-brand">
          <Link href="/">
            <Image
              src="/logo.jpeg"
              alt="Enentry"
              height={40}
              width={90}
              className="rounded-full"
            />
          </Link>
        </div>
        {pathName === "/" ? <Search /> : ""}

        <ul className="flex gap-4 text-[#9C9C9C]">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact Us</Link>
          </li>
          <li>
            <LoginOut />
          </li>
        </ul>
      </div>
    </nav>
  );
}
