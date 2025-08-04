import React from "react";
import Nav from "../Usercomponent/Nav";
import { UserHero } from "./UserHero";
import { UserCards } from "./cards";
import createparcelImg from "../../images/create-parcel.jpg";
import trackImg from "../../images/track-parcel.jpg";
import histImg from "../../images/history-parcel.jpg";

export const UserDashboard = () => {
  return (
    <div>
      <Nav />
      <UserHero />
      <div
        className="mt-16 flex flex-col lg:flex-row items-center lg:items-stretch justify-center space-y-8 lg:space-y-0 lg:space-x-4 p-12 mx-auto"
        id="cards"
      >
        <UserCards
          title="Create Parcel"
          par="Easily register and schedule your parcel for pickup or drop-off. Fill in the destination, parcel details, and sender/receiver information to get started."
          img={createparcelImg}
          btn={"Create Parcel now"}
          link="/parcel/create"
        />
        <UserCards
          title="Track Parcel"
          par="Stay updated with real-time tracking. Enter your tracking number to check the current location, status, and estimated delivery time of your parcel. 
"
          img={trackImg}
          btn={"Track now"}
          link={"/parcel/track"}
        />
        <UserCards
          title="Parcel History"
          par="Stay updated with real-time tracking. Enter your tracking number to check the current location, status, and estimated delivery time of your parcel. Transparency and peace of mind at every step.

"
          img={histImg}
          btn={"View history"}
          link={"/parcel/history"}
        />
      </div>
    </div>
  );
};
