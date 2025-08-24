import React from "react";
import { assets } from "../../assets/assets";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };
  return (
    <>
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
            onClick={logout}
            className="bg-transparent border-none p-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transition-transform active:scale-95"
          >
            {" "}
            <img
              src={assets.user_logout_icon}
              alt="login icon"
              className="w-10 h-10 cursor-pointer hover:opacity-80"
              title="log out"
            />
          </button>
        </div>
      </header>
      {/* //!SECTION */}
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        <div className="w-full md:w-[30%] lg:w-[25%] xl:w-[20%]">
          <Sidebar />
        </div>

        <div className="w-full p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
