import React, { use, useEffect, useState } from "react";
import Nav from "./Nav";
import { useParams } from "react-router-dom";
import cookie from "js-cookie";
export const Viewparcel = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const token = cookie.get("token");
    async function getParcelDetails() {
      try {
        const backendUrl = process.env.REACT_APP_BACKENDURL;

        const resp = await fetch(`${backendUrl}/parcel/${id}`, {
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        if (!resp.ok) throw new Error("Failed to fetch parcel data");
        const data = await resp.json();
        setDetails(data);
      } catch (err) {
        console.error("Error:", err.message);
      }
    }

    if (id) getParcelDetails();
  }, [id]);

  if (!details) return <p>Loading...</p>;

  // get formatted date
  function Get_formatedDate(date) {
    const editedDate = new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return editedDate;
  }

  return (
    <>
      <Nav />
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl border p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">📦 Parcel Details</h2>

        {/* Parcel Info */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="font-semibold">Parcel ID:</p>
            <p>PRC-{details._id}</p>
          </div>
          <div>
            <p className="font-semibold">Current Status:</p>
            <span
              className={`inline-block px-3 py-1 text-xs font-semibold text-white ${
                details.status === "Pending" && "bg-black"
              }  ${details.status === "Assigned" && "bg-yellow-500"} ${
                details.status === "Intransit" && "bg-red-500"
              }  ${details.status === "Assigned" && "bg-yellow-500"} ${
                details.status === "Delivered" && "bg-green-500"
              } ${
                details.status === "Returned" && "bg-orange-500"
              }   rounded-full`}
            >
              {details.status}
            </span>
          </div>

          <div>
            <p className="font-semibold">Created:</p>
            <p>{Get_formatedDate(details.created)}</p>
          </div>
          <div>
            <p className="font-semibold">Estimated Delivery:</p>
            <p> {details.eta ? details.eta : "---"}</p>
          </div>

          <div className="col-span-2">
            <p className="font-semibold">Receiver:</p>
            <p>{details.recieverName}</p>
          </div>
          <div className="col-span-2">
            <p className="font-semibold">Pickup Address:</p>
            <p>{details.pickupAddress}</p>
          </div>
          <div className="col-span-2">
            <p className="font-semibold">Delivery Address:</p>
            <p>{details.deliveryAddress}</p>
          </div>
          <div className="col-span-2">
            <p className="font-semibold">Description:</p>
            <p>{details.parcelDescription}</p>
          </div>
          <div className="col-span-2">
            <p className="font-semibold">Weight:</p>
            <p>{details.parcelWeight}kg</p>
          </div>
        </div>

        {/* Rider Info */}
        {details.status !== "Pending" && (
          <div className="pt-4 border-t">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              🚚 Rider Info
            </h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-semibold">Name:</span>
                {details.assignedRider.name}
              </p>
              <p>
                <span className="font-semibold">Phone: </span>
                {details.assignedRider.phone}
              </p>
            </div>
          </div>
        )}

        {/* Tracking Timeline */}
        <div className="pt-6 border-t">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            📍 Tracking Timeline
          </h3>
          <ol className="relative border-l border-gray-300 text-sm text-gray-700">
            {(details.status === "Pending" ||
              details.status === "Assigned" ||
              details.status === "Intransit" ||
              details.status === "Delivered" ||
              details.status === "Returned") && (
              <li className="mb-5 ml-4">
                <div className="absolute w-3 h-3 bg-black rounded-full -left-1.5 top-1.5 border border-white"></div>
                <p className="font-semibold">Pending Request</p>
                <p className="text-xs text-gray-500">
                  {Get_formatedDate(details.created)}
                </p>
              </li>
            )}

            {(details.status === "Assigned" ||
              details.status === "Intransit" ||
              details.status === "Delivered" ||
              details.status === "Returned") && (
              <li className="mb-5 ml-4 ">
                <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-1.5   border border-white"></div>

                <p className="font-semibold">Assigned to Rider</p>
                <p className="text-xs text-gray-500">
                  {Get_formatedDate(details.riderAssignedDate)}
                </p>
              </li>
            )}
            {(details.status === "Intransit" ||
              details.status === "Delivered" ||
              details.status === "Returned") && (
              <li className="mb-5 ml-4">
                <div className="absolute w-3 h-3 bg-yellow-500 rounded-full -left-1.5  border border-white"></div>
                <p className="font-semibold">In Transit</p>
                <p className="text-xs text-gray-500">
                  {Get_formatedDate(details.inTransitDate)}
                </p>
              </li>
            )}
            {details.status === "Returned" && (
              <li className="ml-4">
                <div className="absolute w-3 h-3 bg-orange-300 rounded-full -left-1.5  border border-white"></div>
                <p className="font-semibold text-gray-400">Returned</p>
                <p className="text-xs text-gray-500">
                  {Get_formatedDate(details.ReturnedDate)}
                </p>
              </li>
            )}
            {details.status === "Delivered" && (
              <li className="ml-4">
                <div className="absolute w-3 h-3 bg-gray-300 rounded-full -left-1.5  border border-white"></div>
                <p className="font-semibold text-gray-400">Delivered</p>
                <p className="text-xs text-gray-500">
                  {Get_formatedDate(details.DeliveredDate)}
                </p>
              </li>
            )}
          </ol>
        </div>
      </div>
    </>
  );
};
