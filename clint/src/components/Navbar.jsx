import React from "react";
import { assets } from "../assets/assets";
import "../index.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center py-4 px-8 sm:px-20 xl:px-32 bg-white shadow-md">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-44"
      />

      <button
        onClick={() => navigate("/admin")}
        className="group flex items-center gap-2 rounded-full bg-green-600 px-6 py-2 font-semibold text-white
                   shadow-md shadow-green-500/30 transition-all 
                   hover:bg-green-700 hover:shadow-lg 
                   active:scale-95 
                   focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Login
        <img
          src={assets.arrow}
          alt="login icon"
          className="w-3 transition-transform group-hover:translate-x-1"
        />
      </button>
    </div>
  );
};

export default Navbar;
