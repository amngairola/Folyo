import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  const navigate = useNavigate();

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
        <motion.div variants={itemVariants}>
          {/* A more descriptive and slightly animated SVG */}
          <svg
            className="mx-auto h-28 w-28 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <motion.path
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 10h.01M15 10h.01"
            />
          </svg>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mt-6 text-6xl font-extrabold text-gray-900 tracking-tight"
        >
          404
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-2 text-2xl font-semibold text-gray-700"
        >
          Page Not Found
        </motion.p>

        <motion.p variants={itemVariants} className="mt-4 text-gray-500">
          Oops! Looks like you've taken a wrong turn in the digital wilderness.
        </motion.p>

        {/* Grouping the buttons for better layout */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="w-full sm:w-auto inline-block rounded-md bg-green-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition-all duration-200 hover:bg-green-700 hover:scale-105"
          >
            Go Back Home
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-block rounded-md bg-gray-200 px-6 py-3 text-lg font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-300 hover:scale-105"
          >
            Go Back
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
