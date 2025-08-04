import React, { useState } from "react";
import { AdminNav } from "./adminNav";

export const ChangeparcelStatus = () => {
  const [parcelId, setParcelId] = useState("");
  const [status, setStatus] = useState("");

  const statusOptions = ["Pending", "In Transit", "Delivered"];

  const handleStatusChange = () => {
    if (!parcelId || !status) {
      alert("Please enter Parcel ID and select a status.");
      return;
    }

    // Call your backend API here to update the parcel status
    console.log(`Parcel ${parcelId} updated to status: ${status}`);
  };

  return (
    <>
      <AdminNav />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-4">Change Parcel Status</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Parcel ID</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter Parcel ID"
            value={parcelId}
            onChange={(e) => setParcelId(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">New Status</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">-- Select Status --</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleStatusChange}
        >
          Update Status
        </button>
      </div>
    </>
  );
};
