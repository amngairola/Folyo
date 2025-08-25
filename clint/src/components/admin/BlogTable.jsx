import React from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const BlogTable = ({ blog, fetchBlog, index }) => {
  const Navigate = useNavigate();
  const handleClick = () => {
    console.log("clicked");
    Navigate(`/blog/${_id}`);
  };
  const { _id, title, createdAt } = blog;
  const BlogData = new Date(createdAt);
  return (
    <tr
      className="border-b border-gray-200 hover:bg-gray-50 coursor-pointer"
      onClick={handleClick}
    >
      {/* Index Column */}
      <th scope="row" className="px-6 py-4 font-medium text-gray-900">
        {index}
      </th>

      {/* Title Column */}
      <td className="px-6 py-4">{title}</td>

      {/* Date Column */}
      <td className="px-6 py-4">{new Date(BlogData).toLocaleDateString()}</td>

      {/* Status Column with Badge */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            blog.isPublished
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {blog.isPublished ? "Published" : "Draft"}
        </span>
      </td>

      {/* Actions Column */}
      <td className="px-6 py-4 flex items-center gap-4">
        <button
          className={`text-sm font-medium ${
            blog.isPublished
              ? "text-yellow-600 hover:text-yellow-900"
              : "text-green-600 hover:text-green-900"
          }`}
        >
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>
        <button>
          <img
            src={assets.blog_delete_icon}
            alt="Delete"
            className="w-5 h-5 cursor-pointer transition-transform duration-300 hover:scale-110"
          />
        </button>
      </td>
    </tr>
  );
};

export default BlogTable;
