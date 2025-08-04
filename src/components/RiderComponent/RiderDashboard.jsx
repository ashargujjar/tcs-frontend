import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
const RiderDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);
  const token = cookie.get("token");
  useEffect(() => {
    setLoading(true);

    async function getRiderdashboardInfo() {
      const backendUrl = process.env.REACT_APP_BACKENDURL;

      const resp = await fetch(`${backendUrl}/rider/dashboard`, {
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      if (resp.ok) {
        setLoading(false);

        const body = await resp.json();
        setDashboardData(body);
      } else {
        setLoading(false);
        console.log("error accoured in loading");
      }
    }
    getRiderdashboardInfo();
  }, []);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-emerald-700 mb-6">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Assigned Parcels Summary */}
        <div className="bg-white shadow-md rounded-lg p-5 border-l-4 border-emerald-600">
          <h2 className="text-lg font-semibold text-gray-700">
            Assigned Parcels
          </h2>
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <p className="text-3xl font-bold text-emerald-600 mt-2">
              {dashboardData.assignedParcels}
            </p>
          )}
          <p className="text-sm text-gray-500">
            Total parcels currently assigned to you
          </p>
        </div>

        {/* Delivered Parcels */}
        <div className="bg-white shadow-md rounded-lg p-5 border-l-4 border-emerald-600">
          <h2 className="text-lg font-semibold text-gray-700">
            Delivered Parcels
          </h2>
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <p className="text-3xl font-bold text-emerald-600 mt-2">
              {dashboardData.Delivered}
            </p>
          )}
          <p className="text-sm text-gray-500">
            Parcels successfully delivered
          </p>
        </div>

        {/* Pending Updates */}
        <div className="bg-white shadow-md rounded-lg p-5 border-l-4 border-yellow-500">
          <h2 className="text-lg font-semibold text-gray-700">
            Status Updates Needed
          </h2>
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <p className="text-3xl font-bold text-yellow-500 mt-2">
              {dashboardData.UpdatesNeeded}
            </p>
          )}
          <p className="text-sm text-gray-500">
            Parcels awaiting status update
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;
