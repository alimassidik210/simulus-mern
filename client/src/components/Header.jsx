import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-black font-mono">
      <div className="max-w-6xl mx-auto p-3 flex items-center justify-between">
        <Link to={"/"}>
          <h1 className="text-sm sm:text-2xl font-bold flex flex-wrap">
            <span className="text-white">Simulus</span>
            <span className="text-indigo-500 hover:text-sky-700">Motors.</span>
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
        <ul className="flex items-center gap-4">
          <Link to={"/"}>
            <li className="hidden sm:inline text-white hover:underline">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden sm:inline text-white hover:underline">
              About
            </li>
          </Link>
          <Link to={"/profile"}>
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
              />
            ) : (
              <li className="text-white hover:underline">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
