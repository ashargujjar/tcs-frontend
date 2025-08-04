import React, { useEffect, useState } from "react";
import { AdminNav } from "./adminNav";
import { Link } from "react-router-dom";
import cookie from "js-cookie";
export const AllParcels = () => {
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [parcelsData, setParcelsData] = useState([]);

  // Filter based on status
  const filteredParcels = parcelsData.filter((p) => {
    return filterStatus ? p.status === filterStatus : true;
  });

  // Fetch parcels on mount
  useEffect(() => {
    async function Get_allParcels() {
      const backendUrl = process.env.REACT_APP_BACKENDURL;
      const token = cookie.get("token");
      const resp = await fetch(`${backendUrl}/admin/allParcels`, {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.ok) {
        const body = await resp.json();
        setParcelsData(body);
      }
    }
    Get_allParcels();
  }, []);

  return (
    <>
      <AdminNav />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">List Of Parcels</h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          <select
            className="border px-4 py-2 rounded"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Intransit">In Transit</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        {/* Parcel Table */}
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Tracking ID</th>
              <th className="px-4 py-2 text-left">Receiver</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredParcels.map((parcel) => (
              <tr key={parcel._id} className="border-t">
                <td className="px-4 py-2">{parcel._id}</td>
                <td className="px-4 py-2">{parcel.recieverName}</td>
                <td className="px-4 py-2">{parcel.status}</td>
                <td className="px-4 py-2">
                  {new Date(parcel.created).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{parcel.userId}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-4">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => setSelectedParcel(parcel)}
                    >
                      View
                    </button>
                    {parcel.status === "Pending" && (
                      <Link
                        to={`/admin/assign?parcelId=${parcel._id}`}
                        className="text-blue-500 hover:underline"
                      >
                        Assign Rider
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for Parcel Details */}
        {selectedParcel && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500"
                onClick={() => setSelectedParcel(null)}
              >
                ✕
              </button>
              <h3 className="text-xl font-bold mb-4">Parcel Details</h3>
              <div className="space-y-2">
                <p>
                  <strong>Tracking ID:</strong> {selectedParcel._id}
                </p>
                <p>
                  <strong>Receiver:</strong> {selectedParcel.recieverName}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedParcel.phone}
                </p>
                <p>
                  <strong>Pickup:</strong> {selectedParcel.pickupAddress}
                </p>
                <p>
                  <strong>Delivery:</strong> {selectedParcel.deliveryAddress}
                </p>
                <p>
                  <strong>Weight:</strong> {selectedParcel.parcelWeight}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {selectedParcel.parcelDescription}
                </p>
                <p>
                  <strong>Status:</strong> {selectedParcel.status}
                </p>
                <p>
                  <strong>Rider:</strong> {selectedParcel.rider || "Unassigned"}
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(selectedParcel.created).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
