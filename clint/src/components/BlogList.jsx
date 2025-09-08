import React, { useState } from "react";
import { blog_data, blogCategories } from "../assets/assets";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";
const BlogList = () => {
  // Destructure the global 'blogs' array and the current search 'input' from the AppContext
  const { blogs, input } = useAppContext();

  // Create a local state to manage the currently selected category filter, defaulting to "All"
  const [menu, setMenu] = useState("All");

  // This function filters the list of blogs based on the search input
  const filterdBlogs = () => {
    // If the search input is empty, return the full, unfiltered list of blogs
    if (input === "") {
      return blogs;
    }

    // If there is search input, filter the blogs array
    return blogs.filter(
      (blog) =>
        // Check if the blog's title (in lowercase) includes the search term (in lowercase)
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        // Or, check if the blog's category includes the search term
        blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

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
        {filterdBlogs()
          .filter((blog) => (menu == "All" ? true : blog.category == menu))
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
