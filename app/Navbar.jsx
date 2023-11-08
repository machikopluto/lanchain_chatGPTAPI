import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed z-10 top-0 bg-gray-50 text-gray-800 w-full p-4 grid grid-cols-3 items-center">
      <a href="/" className={`text-center`}>
        Langchain
      </a>
      <div className="grid grid-flow-col gap-4">
        <Link href="/">Home </Link>
        <Link href="/memory">Memory</Link>
        <Link href="/pdf">PDF-GPT</Link>
      </div>
    </nav>
  );
};

export default Navbar;