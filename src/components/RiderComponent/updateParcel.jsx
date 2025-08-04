import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Ridernav } from "./Ridernav";
import cookie from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateParcelStatus = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const trackingFromQuery = queryParams.get("trackingId") || "";

  const [trackingId, setTrackingId] = useState(trackingFromQuery);
  const [status, setStatus] = useState("Intransit");
  const [loading, setLoading] = useState(false);

  const token = cookie.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const backendUrl = process.env.REACT_APP_BACKENDURL;

      const response = await fetch(
        `${backendUrl}/rider/updateStatus/${trackingId}`,
        {
          credentials: "include",

          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Status updated successfully!");
      } else {
        toast.error(`Error: ${data.message || "Failed to update status"}`);
      }
    } catch (error) {
      toast.error("Failed to update status. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Ridernav />
      <ToastContainer />
      <div className="p-4 md:p-8 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-emerald-700 mb-6">
          Update Parcel Status
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Tracking ID
            </label>
            <input
              type="text"
              required
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              disabled={!!trackingFromQuery}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-emerald-300"
              placeholder="Enter Tracking ID"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              New Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-emerald-300"
            >
              <option value="Intransit">Intransit</option>
              <option value="Delivered">Delivered</option>
              <option value="Returned">Returned</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-4 py-2 rounded flex items-center gap-2"
            disabled={loading}
          >
            {loading && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
            Update Status
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateParcelStatus;
