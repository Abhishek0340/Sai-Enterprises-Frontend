import React from "react";
import Navbar from "./Navbar";
import { Slider } from "./Slider";
import { Categories } from "./Categories";
import { Products } from "./Products";
import Footer from "./Footer";
import Reviews from "./Reviews";

export default function HomeLayout() {
  return (
    <div className="">
      <Navbar />
      <div className="px-4 sm:px-8 md:px-16 lg:px-24">
        <Slider />
      </div>
      <div className="px-4 sm:px-8 md:px-16 lg:px-24">
        <Categories />
      </div>
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 py-8">
        <Products />
      </div>
      <div className="px-4 hidden sm:px-8 md:px-16 lg:px-24 py-8">
        <Reviews />
      </div>
      <Footer />
    </div>
  );
}
