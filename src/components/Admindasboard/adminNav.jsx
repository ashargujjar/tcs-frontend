import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import cookie from "js-cookie";
export const AdminNav = () => {
  const navigate = useNavigate();
  function handlelogout() {
    cookie.remove("role");
    cookie.remove("token");
    navigate("/");
  }
  return (
    <nav className="bg-gray-800 text-white w-full flex items-center justify-between px-6 py-4 shadow-md">
      <Link to="/admin/dashboard">
        <div className="text-xl font-bold">Admin Dashboard</div>
      </Link>
      <ul className="flex space-x-6 text-sm">
        <li>
          <Link to="/admin/parcels" className="hover:text-blue-400">
            All Parcels
          </Link>
        </li>
        <li>
          <Link to="/admin/assign" className="hover:text-blue-400">
            Assign Rider
          </Link>
        </li>
        <li>
          <button onClick={handlelogout} className="hover:text-blue-400">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};
