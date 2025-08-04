import React from "react";
import image from "../../images/works.jpg";
export const Works = () => {
  return (
    <>
      <div className="p-12">
        <h2 className="text-3xl tracking-wide my-14 text-gray-900 font-bold text-center">
          How It Works
        </h2>
        <div className="flex flex-col lg:flex-row items-center gap-10 w-[90%] mx-auto my-10">
          {/* Image Section */}
          <div className="flex justify-center items-center bg-emerald-200 rounded-xl p-6 shadow-md">
            <img
              src={image}
              alt="Parcel Process"
              className="w-full max-w-md rounded-md"
            />
          </div>

          {/* Steps Section */}
          <div className=" bg-emerald-200 rounded-xl p-6 shadow-md w-full max-w-xl">
            <h2 className="text-2xl font-semibold mb-4 text-emerald-600">
              How It Works
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 text-lg">
              <li>
                <strong>Book Your Parcel:</strong> Fill in sender & receiver
                details. Get Tracking ID.
              </li>
              <li>
                <strong>Get Tracking ID:</strong> We generate a unique ID for
                every parcel.
              </li>
              <li>
                <strong>Track It Anytime:</strong> Use the ID to check status
                via app or chat.
              </li>
              <li>
                <strong>Get Delivered:</strong> Fast, secure, and reliable
                delivery.
              </li>
            </ol>
          </div>
        </div>
      </div>
      <footer className="footer sm:footer-horizontal bg-emerald-800 text-emerald-100  p-10">
        <aside>
          <h1 className="text-2xl font-bold">SwiftTrack</h1>
          <p>
            ACME Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </>
  );
};
