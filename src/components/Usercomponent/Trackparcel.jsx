import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { Nav as HomeNav } from "../homeComponent/Nav";
import { useSearchParams } from "react-router-dom";
import cookie from "js-cookie";

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState("");
  const [parcel, setParcel] = useState(null); // Simulated parcel info
  const [loading, setLoading] = useState(false);
  const [rider, setRider] = useState();
  const handleTrack = async () => {
    // Simulate fetching data

    try {
      const token = cookie.get("token");
      setLoading(true);
      const backendUrl = process.env.REACT_APP_BACKENDURL;

      const resp = await fetch(`${backendUrl}/parcel/${trackingId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      if (!resp.ok) throw new Error("Failed to fetch parcel data");
      const data = await resp.json();
      console.log(data);
      setParcel(data);
    } catch (err) {
      console.error("Error:", err.message);
    }
    setLoading(false);
  };
  const [searchParams] = useSearchParams();
  const home = searchParams.get("home");

  return (
    <>
      {home === "true" ? <HomeNav /> : <Nav />}

      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Track Your Parcel
        </h1>

        <div className="flex items-center space-x-2 mb-6">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter Tracking ID"
            className="input input-bordered w-full"
          />
          {!loading ? (
            <button
              onClick={handleTrack}
              className="btn bg-blue-600 text-white hover:bg-blue-700"
            >
              Track
            </button>
          ) : (
            <button
              disabled
              className="btn bg-blue-600 text-white hover:bg-blue-700"
            >
              <span class="loading loading-spinner loading-lg"></span>
            </button>
          )}
        </div>

        {parcel && (
          <div className="bg-white shadow rounded-xl p-6 space-y-4 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700">
              Tracking ID: <span className="text-gray-900">{parcel._id}</span>
            </h2>

            <div>
              <p className="font-medium text-gray-600">Current Status:</p>
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold rounded-full  text-white  ${
                  parcel.status === "Pending" && "bg-black"
                }  ${parcel.status === "Assigned" && "bg-yellow-500"} ${
                  parcel.status === "Intransit" && "bg-red-500"
                }  ${parcel.status === "Assigned" && "bg-yellow-500"} ${
                  parcel.status === "Delivered" && "bg-green-500"
                } ${parcel.status === "Returned" && "bg-orange-500"}`}
              >
                {parcel.status}
              </span>
            </div>

            {parcel.rider !== "not assigned" && (
              <div>
                <p className="font-medium text-gray-600">Rider Info:</p>
                <p className="text-gray-800">
                  <span className="font-normal">Name: </span>
                  {parcel.assignedRider.name}
                </p>
                <p className="text-gray-600">
                  <span className="font-normal">Phone: </span>
                  {parcel.assignedRider.phone}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TrackParcel;
