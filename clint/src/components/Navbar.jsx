import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header
      className="sticky top-2 z-50
     bg-white rounded-m border-gray-400  ml-5 mr-5"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <img
          onClick={() => navigate("/")}
          src={assets.folyo}
          alt="Folyo logo"
          className="w-28 sm:w-32 cursor-pointer"
        />

        <button
          onClick={() => navigate("/admin")}
          className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-green-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
        >
          Login
          <img
            src={assets.arrow}
            alt="login icon"
            className="w-3 transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
