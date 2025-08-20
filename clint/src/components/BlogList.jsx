import React, { useState } from "react";
import { blog_data, blogCategories } from "../assets/assets";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
const BlogList = () => {
  const [menu, setMenu] = useState("All");

  return (
    <div>
      {/*  category list  */}
      <div className="flex justify-center items-center flex-wrap bg-gray-100 p-2 rounded-full">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`
          w-full 
          px-4 py-2 
          text-sm font-medium 
          transition-colors duration-300 
          relative z-10
          ${
            menu === item
              ? "text-white" // Active text color
              : "text-gray-700 hover:text-black" // Inactive text color
          }
        `}
            >
              {item}
            </button>

            {/* This is the sliding highlight */}
            {menu === item && (
              <motion.div
                className="absolute inset-0 bg-green-600 rounded-full z-0"
                layoutId="highlight" // This ID tells Framer Motion to animate between elements
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* //blog cardss */}
        {blog_data
          .filter((blog) => (menu == "All" ? true : blog.category == menu))
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
