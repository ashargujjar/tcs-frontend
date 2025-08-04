import React, { useState } from "react";
import Nav from "./Nav";
import cookie from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function CreateParcel() {
  const [parcel, setParcel] = useState({
    recieverName: "",
    pickupAddress: "",
    deliveryAddress: "",
    phone: "",
    parcelDescription: "",
    parcelWeight: undefined,
  });
  const [loading, setLoading] = useState(false);
  const success = () => {
    toast.success("Your Parcel request submitted!", {
      autoClose: 7000,
    });
  };
  const err = () => {
    toast.error("error creating parcel", {
      autoClose: 7000,
    });
    toast.error("Please try again", {
      autoClose: 7000,
    });
  };
  const navigate = useNavigate();
  function handleChange(event) {
    const { name, value } = event.target;
    setParcel((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const token = cookie.get("token");
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const backendUrl = process.env.REACT_APP_BACKENDURL;

      const resp = await fetch(`${backendUrl}/parcel/create`, {
        method: "POST",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(parcel),
      });
      if (resp.ok) {
        success();
        setLoading(false);
        setTimeout(() => {
          navigate("/user/dashboard");
        }, 3000);
      } else {
        err();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      err();
      console.log(error);
    }
  }
  return (
    <>
      <ToastContainer />
      <Nav />
      <section className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Book a Parcel
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Receiver Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Receiver Name
              </label>
              <input
                type="text"
                placeholder="e.g. Ali Khan"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                name="recieverName"
                value={parcel.recieverName}
                onChange={handleChange}
              />
            </div>

            {/* Pickup Address */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Pickup Address
              </label>
              <input
                type="text"
                placeholder="e.g. House #123, Lahore"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                name="pickupAddress"
                onChange={handleChange}
                value={parcel.pickupAddress}
              />
            </div>

            {/* Delivery Address */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Delivery Address
              </label>
              <input
                type="text"
                placeholder="e.g. Street 45, Islamabad"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                onChange={handleChange}
                name="deliveryAddress"
                value={parcel.deliveryAddress}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="03xx-xxxxxxx"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                onChange={handleChange}
                name="phone"
                value={parcel.phone}
              />
            </div>

            {/* Parcel Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Parcel Description
              </label>
              <textarea
                rows={4}
                placeholder="What's inside the parcel?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                name="parcelDescription"
                onChange={handleChange}
                value={parcel.parcelDescription}
              ></textarea>
            </div>

            {/* Parcel Weight */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Parcel Weight (optional)
              </label>
              <input
                type="number"
                placeholder="e.g. 2.5 kg"
                onChange={handleChange}
                name="parcelWeight"
                value={parcel.parcelWeight}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              {!loading ? (
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition"
                >
                  Submit Parcel
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition"
                >
                  Please wait...
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
