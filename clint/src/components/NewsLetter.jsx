import React, { useState } from "react";
import { assets } from "../assets/assets";

import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const { axios } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubscribing(true);

    try {
      const { data } = await axios.post("/api/newsLetter/subscribe", { email });
      if (data.success) {
        toast.success(data.message);
        setEmail("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubscribing(false);
    }
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
            type="email"
            placeholder="Enter your email"
            required
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 rounded-md border-gray-300 focus:outline-none ring-2 ring-green-500"
          />

          <button className="bg-transparent border-none p-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transition-transform active:scale-95">
            {isSubscribing ? (
              "Subscribing..."
            ) : (
              <img
                src={assets.subscribe_icon}
                alt="subscribe "
                className="w-12 h-13 cursor-pointer hover:opacity-80"
              />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
