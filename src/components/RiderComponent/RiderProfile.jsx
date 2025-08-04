import React, { useEffect, useState } from "react";
import { Ridernav } from "./Ridernav";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";

const RiderProfile = () => {
  const [rider, setRider] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookie.get("token");

    if (!token) {
      navigate("/");
      return;
    }

    const fetchRider = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKENDURL;
        const response = await fetch(`${backendUrl}/user/data  `, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",

          method: "GET",
        });

        const data = await response.json();
        if (response.ok) {
          setRider(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching rider:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRider();
  }, [navigate]);

  function handleLogout() {
    cookie.remove("token");
    cookie.remove("role");
    navigate("/");
  }

  return (
    <>
      <Ridernav />
      <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-semibold mb-4 text-emerald-700">
          Rider Profile
        </h2>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <span className="loading loading-dots loading-xl text-emerald-700"></span>
          </div>
        ) : (
          rider && (
            <div className="bg-white shadow-md rounded-lg p-6 max-w-xl">
              <div className="mb-4">
                <p className="text-gray-600 font-medium">Name</p>
                <p className="text-lg">{rider.name}</p>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 font-medium">Email</p>
                <p className="text-lg">{rider.email}</p>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 font-medium">Phone</p>
                <p className="text-lg">{rider.phone}</p>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 font-medium">Joined Date</p>
                <p className="text-lg">
                  {new Date(rider.joiningDate).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700 transition duration-200"
              >
                Logout
              </button>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default RiderProfile;
