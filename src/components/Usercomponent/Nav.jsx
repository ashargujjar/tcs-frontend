import React from "react";
import { Link, useNavigate } from "react-router-dom";
import cookie from "js-cookie";

const Nav = () => {
  const navigate = useNavigate();
  function handleLogout() {
    cookie.remove("token");
    cookie.remove("roll");
    localStorage.clear();
    navigate("/");
  }
  return (
    <nav className="relative z-50">
      <div className="navbar bg-emerald-800 text-gray-800 shadow-sm flex flex-col md:flex-row md:justify-between items-center px-6 py-4 space-y-4 md:space-y-0">
        {/* Logo */}
        <div>
          <Link to="/user/dashboard">
            <h1 className="text-2xl font-bold text-white">SwiftTrack</h1>
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <Link
            to="/parcel/create"
            className="btn  focus-none w-full md:w-auto px-6 py-2   text-white  transition duration-300 rounded-l bg-emerald-800 hover:bg-emerald-900 border-2 border-emerald-700   text-xl shadow-none "
          >
            Create Parcel
          </Link>
          <Link
            to="/parcel/track"
            className="btn  focus-none w-full md:w-auto px-6 py-2   text-white  transition duration-300 rounded-l bg-emerald-800 hover:bg-emerald-900 border-2 border-emerald-700   text-xl shadow-none "
          >
            Track Parcel
          </Link>
          <Link
            to="/parcel/history"
            className="btn  focus-none w-full md:w-auto px-6 py-2   text-white  transition duration-300 rounded-l bg-emerald-800 hover:bg-emerald-900 border-2 border-emerald-700   text-xl shadow-none "
          >
            Parcel History
          </Link>
          <button
            onClick={handleLogout}
            className="btn focus-none w-full md:w-auto px-6 py-2 bg-emerald-700 hover:bg-black text-white hover:text-white transition duration-300 rounded-l border-none text-xl shadow-none"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
