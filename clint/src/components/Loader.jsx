import React from "react";
import { assets } from "../assets/assets";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div id="loader" className="text-center animate-move-lr">
        <h4 className="text-lg font-semibold mb-2">Loading...</h4>
        <img
          className="h-24 w-24 mx-auto"
          src={assets.loading_icon}
          alt="Loading icon"
        />
      </div>
    </div>
  );
};

export default Loader;
