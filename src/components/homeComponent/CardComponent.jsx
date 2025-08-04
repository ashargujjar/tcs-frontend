import React from "react";

const Card = ({ image, title, par }) => {
  return (
    <div className="card bg-base-100 w-96  rounded-2xl shadow-xl bg-emerald-200 hover:-translate-y-1 transition duration-400">
      <figure>{<img className="w-full" src={image} alt="Shoes" />}</figure>
      <div className="card-body">
        <h2 className="card-title md:text-xl text-gray-900">{title}</h2>
        <p className="text-gray-900">{par}</p>
      </div>
    </div>
  );
};

export default Card;
