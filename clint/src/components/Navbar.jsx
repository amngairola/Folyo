import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { token } = useAppContext(); // Removed setToken as it's not used here
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="flex justify-between items-center max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <img
          onClick={() => navigate("/")}
          src={assets.folyo}
          alt="Folyo logo"
          className="w-28 sm:w-32 cursor-pointer"
        />

        <div className="flex items-center gap-4">
          {token ? (
            // If logged in, show the Dashboard icon
            <button
              onClick={() => navigate("/admin")}
              className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-200 transition-colors"
            >
              <img
                src={assets.admin_DB_logo}
                alt="Admin Dashboard"
                className="w-5 h-5"
              />
              Dashboard
            </button>
          ) : (
            // If logged out, show the Login icon
            <button
              onClick={() => navigate("/login")}
              className="p-0 bg-transparent border-none rounded-full"
            >
              <img
                src={assets.login_icon}
                alt="Login icon"
                className="w-10 h-10 cursor-pointer hover:opacity-80 rounded-full"
              />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
