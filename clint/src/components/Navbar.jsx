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
          onClick={() => navigate("/*")}
          className="bg-transparent border-none p-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transition-transform active:scale-95"
        >
          {" "}
          <img
            src={assets.login_icon}
            alt="login icon"
            className="w-10 h-10 cursor-pointer hover:opacity-80"
          />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
