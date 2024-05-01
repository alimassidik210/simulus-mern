import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-black">
      <div className="max-w-6xl mx-auto p-3 flex items-center justify-between">
        <Link to={"/"}>
          <h1 className="text-sm sm:text-xl font-bold flex flex-wrap">
            <span className="text-white">Simulus</span>
            <span className="text-white">Motors.</span>
          </h1>
        </Link>
        <form className="bg-white flex items-center  rounded-lg p-3">
          <input
            type="text"
            placeholder="Cari kendaraan .."
            className="bg-transparent w-24 sm:w-64 focus:outline-none text-sm sm:text-md"
          />
          <FaSearch />
        </form>
        <ul className="flex gap-4">
          <Link to={"/"}>
            <li className="hidden sm:inline text-white hover:underline">
              Home
            </li>
          </Link>
          <li className="hidden sm:inline text-white hover:underline">About</li>
          <li className="text-white hover:underline">Sign In</li>
        </ul>
      </div>
    </header>
  );
}
