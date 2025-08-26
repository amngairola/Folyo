import React, { useState, useEffect } from "react";
import UnderConstructionPage from "../UnderConstructionPage";
import { comments_data } from "../../assets/assets";
import { motion } from "framer-motion";
import CommentTableItems from "../../components/CommentTableItems";

const Comments = () => {
  const [comments, setComments] = useState([]);

  const [filter, setFilter] = useState("Not Approved");

  const fetchComments = async () => {
    setComments(comments_data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const filters = ["Approved", "Not Approved"];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Comments</h1>

        {/* Filter Buttons Container */}
        <div className="flex items-center p-1 bg-gray-200 rounded-md">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-3 py-1 text-sm font-medium rounded relative ${
                filter === item ? "text-gray-900" : "text-gray-600"
              }`}
            >
              {/* The sliding highlight */}
              {filter === item && (
                <motion.div
                  layoutId="active-filter-pill"
                  className="absolute inset-0 bg-white rounded-md shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">{item}</span>
            </button>
          ))}
        </div>
      </div>

      {/*  comments table*/}

      <div>
        <table>
          <thead>
            <tr>
              <th scope="col">Blog Title & Comments </th>
              <th scope="col">Date </th>
              <th scope="col">Action </th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter((c) =>
                filter === "Approved"
                  ? c.isApproved === true
                  : c.isApproved === false
              )
              .map((c, i) => (
                <CommentTableItems
                  key={c._id}
                  comment={c}
                  fetchComments={fetchComments}
                  index={i + 1}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
