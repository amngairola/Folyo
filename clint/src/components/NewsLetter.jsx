import React, { useState } from "react";
import { assets } from "../assets/assets";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email);
    setEmail("");
    // console.log(email);
  };

  return (
    <div className="bg-gray-100 p-8 sm:p-12 rounded-lg">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Join Our Newsletter
        </h1>
        <p className="text-gray-600 mb-8">
          Stay up to date with our latest articles, news, and special offers.
          Subscribe to get the content delivered directly to your inbox.
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col sm:flex-row items-center gap-4"
        >
          <input
            type="email" // Changed to type="email" for better validation
            placeholder="Enter your email"
            required
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 rounded-md border-gray-300 focus:outline-none ring-2 ring-green-500"
          />

          <button className="bg-transparent border-none p-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transition-transform active:scale-95">
            <img
              src={assets.subscribe_icon}
              alt="subscribe "
              className="w-12 h-13 cursor-pointer hover:opacity-80"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
