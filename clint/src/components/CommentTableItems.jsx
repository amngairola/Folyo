import React from "react";
import { assets } from "../assets/assets";
import App from "../App";

const CommentTableItems = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment;

  const blogDate = new Date(createdAt);

  return (
    <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
      {/* Comment Details Cell */}
      <td className="p-4 sm:p-6">
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-500 uppercase">Blog</p>
          <p className="text-gray-800">{blog.title}</p>
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
            <button title="Approve">
              <img
                src={assets.comments_approved_icon}
                alt="Approve"
                className="w-8 h-8 cursor-pointer transition-transform duration-300 hover:scale-110"
              />
            </button>
          )}
          <button title="Delete">
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
