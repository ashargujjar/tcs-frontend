import React from "react";
import Card from "./CardComponent";
import image1 from "../../images/rowan-freeman-clYlmCaQbzY-unsplash.jpg";
import image2 from "../../images/geojango-maps-Z8UgB80_46w-unsplash.jpg";
import image3 from "../../images/arlington-research-Kz8nHVg_tGI-unsplash - Copy.jpg";
export const Purpose = () => {
  return (
    <div className=" p-12">
      <h2 className="text-3xl tracking-wide my-14 text-gray-900 font-bold text-center">
        What We Offer
      </h2>
      <div
        id="cards"
        className="flex flex-col items-center justify-center space-y-9 md:flex-row md:space-y-0 md:space-x-6"
      >
        <Card
          image={image1}
          title={"Fast & Secure Delivery"}
          par={"Nationwide & international shipping made safe."}
        />
        <Card
          image={image2}
          title={"Live Parcel Tracking"}
          par={"Stay informed with real-time parcel updates."}
        />
        <Card
          image={image3}
          title={"24/7 Customer Support"}
          par={"Chat with live agents anytime."}
        />
      </div>
    </div>
  );
};
