import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookie from "js-cookie";

export const UserHero = () => {
  const [user, setUser] = useState(null);
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
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",

          method: "GET",
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching rider:", error);
      }
    };

    fetchRider();
  }, [navigate]);
  return (
    <div className="h-screen bg-cover bg-center" id="userHero">
      <div className="absolute inset-0 bg-black/45 z-0"></div>

      <div className="absolute z-20 top-1/2  left-1/2 w-full md:max-w-auto    text-white p-8 -translate-x-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        <h1 className="text-2xl  md:text-4xl font-bold text-center ">
          {user && (
            <span className="capatalize"> We Welcome You {user.name}</span>
          )}
        </h1>
        <p className="mt-4 text-center  text-xl">
          Create Parcel Now To Get Our Best Services
        </p>
        <div className="flex mt-8 justify-center">
          <Link
            to="/parcel/create"
            className=" bg-emerald-900  border-none shadow-none mx-auto  btn btn-soft btn-accent text-white"
          >
            Create Parcel Now
          </Link>
        </div>
      </div>
    </div>
  );
};
