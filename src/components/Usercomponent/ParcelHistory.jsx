import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import cookie from "js-cookie";
export const ParcelHistory = () => {
  const [parcels, setparcels] = useState([]);
  useEffect(() => {
    async function FetchParcels() {
      const backendUrl = process.env.REACT_APP_BACKENDURL;

      const resp = await fetch(`${backendUrl}/user/parcel`, {
        method: "GET",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      if (resp.ok) {
        const parcels = await resp.json();
        setparcels(parcels);
      } else {
      }
    }
    FetchParcels();
  }, []);
  const success = () => {
    toast.success("login  successful!", {
      autoClose: 7000,
    });
  };
  const token = cookie.get("token");
  const err = () => {
    toast.error("user not registered", {
      autoClose: 7000,
    });
    toast.error("create account now", {
      autoClose: 7000,
    });
  };

  return (
    <>
      <Nav />
      <div className="max-w-6xl mx-auto mt-8 p-6 bg-white shadow-md rounded-xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          My Parcels
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Parcel ID</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Assigned Rider</th>
                <th className="px-4 py-3">ETA</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {/* Sample row - replace with map() */}
              {parcels.map((parcel) => (
                <tr className="border-b hover:bg-gray-50" key={parcel._id}>
                  <td className="px-4 py-3 font-medium">#PCL-{parcel._id}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        parcel.status === "Pending" && "bg-black"
                      }  ${parcel.status === "Assigned" && "bg-yellow-500"} ${
                        parcel.status === "Intransit" && "bg-red-500"
                      }  ${parcel.status === "Assigned" && "bg-yellow-500"} ${
                        parcel.status === "Delivered" && "bg-green-500"
                      } ${
                        parcel.status === "Returned" && "bg-orange-500"
                      } text-white `}
                    >
                      {parcel.status}
                      {/* color change on state change */}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(parcel.created).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">{parcel.rider}</td>
                  {/* estimated arrival time eta */}
                  <td className="px-4 py-3 text-md">
                    {parcel.eta ? parcel.eta : "---"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link
                      to={`/view/parcel/${parcel._id}`}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition duration-300"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      View
                    </Link>
                  </td>
                </tr>
              ))}

              {/* Add more rows dynamically */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
