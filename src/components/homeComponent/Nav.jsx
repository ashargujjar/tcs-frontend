import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <div className="navbar bg-emerald-800 text-gray-800 shadow-sm flex flex-col md:flex-row md:justify-between items-center px-6 py-4 space-y-4 md:space-y-0">
      {/* Logo */}
      <div>
        <Link to="/">
          {" "}
          <h1 className="text-2xl font-bold text-white">SwiftTrack</h1>
        </Link>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
        <Link
          to="/login"
          className="btn  focus-none w-full md:w-auto px-6 py-2 hover:bg-emerald-500 text-white hover:text-gray-900 transition duration-300 rounded-xl bg-emerald-800 border-none text-xl shadow-none "
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="btn focus-none w-full md:w-auto px-6 py-2 hover:bg-emerald-500 text-white hover:text-gray-900 transition duration-300 rounded-xl bg-emerald-800 border-none text-xl shadow-none"
        >
          Signup
        </Link>
      </div>
    </div>
  );
};
