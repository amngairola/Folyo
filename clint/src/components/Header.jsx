import React from "react";
import { assets } from "../assets/assets";
import { Form } from "react-router-dom";

const Header = () => {
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative py-20">
      <img
        src={assets.gradientBackground}
        className="absolute inset-0 w-full h-full object-cover z-[-1] opacity-40"
        alt="background gradient"
      />

      <div className="text-center flex flex-col items-center gap-6">
        <div
          className="inline-flex items-center gap-2 bg-white/10 text-sm font-medium px-4 py-1.5 rounded-full
                         cursor-pointer hover:scale-105 transition-transform animate-fade-in-down"
          style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}
        >
          <p>New: AI feature integrated</p>
          <img
            src={assets.star_icon}
            className="w-3.5 animate-pulse"
            alt="star"
          />
        </div>

        <h1
          className="text-5xl sm:text-6xl 
          text-green-600
          font-bold leading-tight animate-fade-in-down"
          style={{ animationDelay: "0.4s", animationFillMode: "backwards" }}
        >
          Folyo
        </h1>

        <p
          className="text-lg text-gray-600 max-w-2xl animate-fade-in-down"
          style={{ animationDelay: "0.6s", animationFillMode: "backwards" }}
        >
          Welcome to our blog where we share the latest insights on technology,
          startups, and lifestyle.
        </p>

        <form className="group relative flex w-full max-w-md items-center rounded-full border border-gray-300 bg-white shadow-sm transition-all focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2">
          {/* Search Icon */}
          <div className="pl-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Input Field */}
          <input
            type="text"
            placeholder="Search blogs"
            required
            className="w-full bg-transparent px-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-none"
          />

          {/* Search Button */}
          <button
            type="submit"
            className="rounded-full bg-green-600 px-5 py-2 font-semibold text-white shadow-md shadow-green-500/30 transition-all hover:bg-green-700 active:scale-95"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};
export default Header;
