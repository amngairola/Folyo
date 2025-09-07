import React from "react";
import { assets } from "../../assets/assets";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  const { navigate, token, setToken } = useAppContext();

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
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
            className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-200 transition-colors"
          >
            {" "}
            <img
              src={assets.user_logout_icon}
              alt="login icon"
              className="w-5 h-5 "
              title="log out"
            />
            logout
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
