import { useEffect, useState } from "react";
import cookie from "js-cookie";
export default function AdminDashboard() {
  const [details, setDetails] = useState({});
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const token = cookie.get("token");
    setLoading(true);
    async function getDetails() {
      const backendUrl = process.env.REACT_APP_BACKENDURL;
      const resp = await fetch(`${backendUrl}/admin/view`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (resp.ok) {
        const body = await resp.json();
        console.log(body);
        setDetails(body);
        setLoading(false);
      }
    }
    getDetails();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Parcels */}
        <div className="bg-blue-100 border border-blue-300 rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold text-blue-800">Total Parcels</h2>
          <p className="text-3xl font-bold text-blue-700 mt-2">
            {Loading ? (
              <span class="loading loading-spinner loading-md"></span>
            ) : (
              details.totalParcels
            )}
          </p>
        </div>

        {/* Delivered */}
        <div className="bg-green-100 border border-green-300 rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold text-green-800">Delivered</h2>
          <p className="text-3xl font-bold text-green-700 mt-2">
            {Loading ? (
              <span class="loading loading-spinner loading-md"></span>
            ) : (
              details.delivered
            )}
          </p>
        </div>

        {/* Pending */}
        <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold text-yellow-800">Pending</h2>
          <p className="text-3xl font-bold text-yellow-700 mt-2">
            {Loading ? (
              <span class="loading loading-spinner loading-md"></span>
            ) : (
              details.pending
            )}
          </p>
        </div>

        {/* Assigned */}
        <div className="bg-purple-100 border border-purple-300 rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold text-purple-800">Assigned</h2>
          <p className="text-3xl font-bold text-purple-700 mt-2">
            {Loading ? (
              <span class="loading loading-spinner loading-md"></span>
            ) : (
              details.assigned
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
