import React from "react";
import { Link } from "react-router-dom";

export const UserCards = ({ title, img, par, btn, link }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl border-2 border-gray-400 flex-1 bg-gray-200 hover:-translate-y-4 duration-400">
      <figure className="px-10 pt-10">
        <img src={img} className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-left">{title}</h2>
        <p>{par}</p>
        <div className="card-actions mt-8">
          <Link
            to={link}
            className="btn bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:scale-105 hover:shadow-xl transition duration-300"
          >
            {btn}
          </Link>
        </div>
      </div>
    </div>
  );
};
