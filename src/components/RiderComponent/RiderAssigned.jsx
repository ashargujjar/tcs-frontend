import React, { useEffect, useState } from "react";
import { Ridernav } from "./Ridernav";
import { Link } from "react-router-dom";
import cookie from "js-cookie";

const AssignedParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  const token = cookie.get("token");

  useEffect(() => {
    async function fetchParcels() {
      try {
        const backendUrl = process.env.REACT_APP_BACKENDURL;

        const response = await fetch(`${backendUrl}/rider/parcels`, {
          method: "GET",
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setParcels(data);
        } else {
          console.error("Failed to fetch parcels");
        }
      } catch (err) {
        console.error("Error:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchParcels();
  }, [token]);

  const filteredParcels =
    filterStatus === "All"
      ? parcels
      : parcels.filter((parcel) => parcel.status === filterStatus);

  const sortedParcels = [...filteredParcels].sort((a, b) => {
    const priority = {
      Intransit: 1,
      Assigned: 2,
      Delivered: 3,
      Returned: 4,
    };
    return (priority[a.status] || 99) - (priority[b.status] || 99);
  });
  return (
    <>
      <Ridernav />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-emerald-700">
            Assigned Parcels
          </h1>
          <select
            className="border border-gray-300 rounded px-3 py-2 bg-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Delivered">Delivered</option>
            <option value="Intransit">In Transit</option>
            <option value="Returned">Returned</option>
            <option value="Assigned">Assigned</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow-md">
            <thead>
              <tr className="bg-emerald-600 text-white text-left">
                <th className="p-3">Parcel ID</th>
                <th className="p-3">Recipient</th>
                <th className="p-3">Address</th>
                <th className="p-3">Status</th>
                <th className="p-3">Assigned Date</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-6 text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                  </td>
                </tr>
              ) : filteredParcels.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No parcels found.
                  </td>
                </tr>
              ) : (
                sortedParcels.map((parcel) => (
                  <tr
                    key={parcel._id}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="p-3 font-medium">{parcel._id}</td>
                    <td className="p-3">{parcel.recieverName}</td>
                    <td className="p-3">{parcel.deliveryAddress}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          parcel.status === "Delivered"
                            ? "bg-green-100 text-green-600"
                            : parcel.status === "Intransit"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {parcel.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {new Date(parcel.riderAssignedDate).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-center">
                      {parcel.status === "Returned" ||
                      parcel.status === "Delivered" ? (
                        <p></p>
                      ) : (
                        <Link
                          to={`/rider/parcelUpdate?trackingId=${parcel._id}`}
                          className="text-sm text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1 rounded"
                        >
                          Update
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AssignedParcels;
