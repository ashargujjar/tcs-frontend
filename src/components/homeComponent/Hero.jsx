import React from "react";
import { Link } from "react-router-dom";
export const Hero = () => {
  return (
    <div
      id="hero"
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-emerald-900 opacity-70"></div>

      {/* Centered content */}
      <div className="relative z-10 text-white text-center px-4">
        <h1 className=" text-3xl md:text-4xl font-bold tracking-wide">
          Welcome to SwiftTrack
        </h1>
        <h3 className="text-xl md:text-2xl mt-5">
          Your Reliable Logistics & Parcel Tracking Partner
        </h3>
        <div className="flex  justify-center items-center  mt-8 space-x-5 md:flex-row">
          <Link
            to="/login"
            className="btn bg-emerald-500 px-7 duration-200 rounded border-none hover:bg-opacity-90 shadow-none text-white hover:-translate-y-1 "
          >
            Login
          </Link>
          <Link
            to="/parcel/track?home=true"
            className="btn   bg-emerald-500  px-7 duration-200 rounded border-none hover:bg-opacity-90 shadow-none text-white hover:-translate-y-1 "
          >
            Track
          </Link>
        </div>
      </div>
    </div>
  );
};
