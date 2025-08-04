import React from "react";
import { Link } from "react-router-dom";

export const Ridernav = () => {
  return (
    <nav className="bg-emerald-600 text-white w-full p-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
      <Link to="/rider/dashboard">
        <h1 className="text-xl font-bold">Rider Dashboard</h1>
      </Link>

      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
        <Link to="/rider/parcels" className="hover:text-yellow-300 transition">
          View Assigned Parcels
        </Link>

        <Link
          to="/rider/parcelUpdate"
          href="/rider/update-status"
          className="hover:text-yellow-300 transition"
        >
          Update Parcel Status
        </Link>

        <Link to="/rider/profile" className="hover:text-yellow-300 transition">
          Profile
        </Link>
      </div>
    </nav>
  );
};
