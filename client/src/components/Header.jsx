import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmbit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFormUrl = urlParams.get("searchTerm");
    if (searchTermFormUrl) {
      setSearchTerm(searchTermFormUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-black shadow-md fixed top-0 left-0 right-0 z-50  font-mono">
      <div className="max-w-6xl mx-auto p-3 flex items-center justify-between">
        <Link to={"/"}>
          <h1 className="text-sm sm:text-2xl font-bold flex flex-wrap">
            <span className="text-white">Simulus</span>
            <span className="text-indigo-500 hover:text-sky-700">Motors.</span>
          </h1>
        </Link>
        <form
          className="bg-white flex items-center  rounded-lg p-3"
          onSubmit={handleSubmbit}
        >
          <input
            type="text"
            placeholder="Pencarian.."
            className="bg-transparent w-24 sm:w-64 focus:outline-none text-sm sm:text-md"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch />
          </button>
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
