import React from "react";
import { assets } from "../assets/assets";
import App from "../App";

import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const CommentTableItems = ({ comment, fetchComments, index }) => {
  const { _id, name, content, createdAt } = comment;

  const blogDate = new Date(createdAt);
  // console.log("comment ", comment);

  // console.log("name & content ", name, content);

  const { axios } = useAppContext();

  const handleApprove = async () => {
    try {
      const { data } = await axios.post("/api/admin/approve-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this blog");
    if (!confirm) return;
    try {
      const { data } = await axios.post("/api/admin/delete-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
      {/* Comment Details Cell */}
      <td className="p-4 sm:p-6">
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-500 uppercase">Blog</p>
          <p className="text-gray-800">{name}</p>
        </div>
        <div>
          <p className="font-medium text-gray-900 mb-1">{comment.name}</p>
          <p className="text-gray-700">{comment.content}</p>
        </div>
      </td>

      {/* Date Cell */}
      <td className="px-6 py-4 text-sm text-gray-600 align-top">
        {blogDate.toLocaleDateString()}
      </td>

      {/* Status & Actions Cell */}
      <td className="px-6 py-4 align-top">
        <div className="flex items-center gap-6">
          {/* Action Buttons */}
          {!comment.isApproved && (
            <button onClick={handleApprove} title="Approve">
              <img
                src={assets.comments_approved_icon}
                alt="Approve"
                className="w-8 h-8 cursor-pointer transition-transform duration-300 hover:scale-110"
              />
            </button>
          )}
          <button onClick={handleDelete} title="Delete">
            <img
              src={assets.blog_delete_icon}
              alt="Delete"
              className="w-8 h-8 cursor-pointer transition-transform duration-300 hover:scale-110"
            />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItems;
