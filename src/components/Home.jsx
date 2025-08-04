import React from "react";
import { Nav } from "./homeComponent/Nav";
import { Hero } from "./homeComponent/Hero";
import { Purpose } from "./homeComponent/Purpose";
import { Works } from "./homeComponent/Works";
export const Home = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <Purpose />
      <Works />
    </div>
  );
};
