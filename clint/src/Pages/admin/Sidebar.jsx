import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full p-4 bg-gray-100 border-r border-gray-200">
      <NavLink
        end={true}
        to="/admin"
        className={({ isActive }) =>
          `flex items-center gap-3 p-3 rounded-lg transition-colors ${
            isActive
              ? "bg-green-100 text-green-800"
              : "text-gray-600 hover:bg-gray-200"
          }`
        }
      >
        <img src={assets.home_icon} alt="Dashboard" className="w-5 h-5" />
        <p className="font-medium">Dashboard</p>
      </NavLink>

      <NavLink
        to="/admin/addBlog"
        className={({ isActive }) =>
          `flex items-center gap-3 p-3 rounded-lg transition-colors ${
            isActive
              ? "bg-green-100 text-green-800"
              : "text-gray-600 hover:bg-gray-200"
          }`
        }
      >
        <img src={assets.add_icon} alt="Add Blog" className="w-5 h-5" />
        <p className="font-medium">Add Blog</p>
      </NavLink>

      <NavLink
        to="/admin/listBlog"
        className={({ isActive }) =>
          `flex items-center gap-3 p-3 rounded-lg transition-colors ${
            isActive
              ? "bg-green-100 text-green-800"
              : "text-gray-600 hover:bg-gray-200"
          }`
        }
      >
        <img src={assets.list_icon} alt="List Blog" className="w-5 h-5" />
        <p className="font-medium">List Blog</p>
      </NavLink>

      <NavLink
        to="/admin/comments"
        className={({ isActive }) =>
          `flex items-center gap-3 p-3 rounded-lg transition-colors ${
            isActive
              ? "bg-green-100 text-green-800"
              : "text-gray-600 hover:bg-gray-200"
          }`
        }
      >
        <img src={assets.comment_icon} alt="Comments" className="w-5 h-5" />
        <p className="font-medium">Comments</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
