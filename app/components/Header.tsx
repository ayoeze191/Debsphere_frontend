import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="max-w-6xl  p-0 mx-auto flex justify-between items-center">
      <div className="w-fit h-fit ">
        <img src={"/Debsphere_Logo.png"} className="w-[150px] h-[150px]" />
      </div>
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
        <Link href="/" className="hover:text-[#6C3CE1] transition-colors">
          Home
        </Link>
        <Link href="/about" className="hover:text-[#6C3CE1] transition-colors">
          About
        </Link>
        <Link
          href="/courses"
          className="hover:text-[#6C3CE1] transition-colors"
        >
          Courses
        </Link>
        <Link
          href="#contact"
          className="hover:text-[#6C3CE1] transition-colors"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Header;
