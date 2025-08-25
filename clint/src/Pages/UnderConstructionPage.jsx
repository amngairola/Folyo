import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { assets } from "../assets/assets"; // Assuming assets are imported correctly

const UnderConstructionPage = () => {
  // Animation variants for the container to orchestrate staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation for individual child elements
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 text-center px-4 overflow-hidden">
      <motion.div
        className="max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Styled Image */}
        <motion.div variants={itemVariants}>
          <img
            src={assets.UnderConstructionPage_icon}
            alt="Under Construction"
            className="h-24 w-24 mx-auto mb-4 animate-pulse"
          />
        </motion.div>

        {/* Status Code */}
        <motion.h1
          variants={itemVariants}
          className="mt-6 text-5xl font-extrabold text-gray-900 tracking-tight"
        >
          503
        </motion.h1>

        {/* Page Title */}
        <motion.p
          variants={itemVariants}
          className="mt-2 text-2xl font-semibold text-gray-700"
        >
          Under Construction
        </motion.p>

        {/* Description */}
        <motion.p variants={itemVariants} className="mt-4 text-gray-500">
          I'm currently working on making this page . Please check back soon!
        </motion.p>

        {/* Call-to-action Button */}
        <motion.div variants={itemVariants} className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-green-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition-all duration-200 hover:bg-green-700 hover:scale-105"
          >
            Go Back Home
            <svg
              xmlns="http://www.w.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UnderConstructionPage;
