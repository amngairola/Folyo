import React from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const BlogTable = ({ blog, fetchBlog, index }) => {
  const Navigate = useNavigate();
  // Handler to navigate to the public-facing blog post page.
  const handleClick = () => {
    console.log("clicked");
    Navigate(`/blog/${_id}`);
  };

  // Destructure necessary properties from the blog object for easier access.
  const { _id, title, createdAt } = blog;
  const BlogData = new Date(createdAt);

  // Get the pre-configured axios instance from the global context.
  const { axios } = useAppContext();

  // Handler for deleting a blog post.
  const handleDelete = async () => {
    // Confirm with the user before deleting.
    const confirm = window.confirm("Are you sure you want to delete this blog");
    if (!confirm) return;
    try {
      const { data } = await axios.post("/api/blog/delete", { id: _id });
      if (data.success) {
        toast.success(data.message);
        await fetchBlog(); // Refetch the blog list to update the UI.
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  // Handler for toggling the publish status of a blog post.
  const handlePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchBlog(); // Refetch the blog list to show the new status.
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 coursor-pointer">
      {/* Index Column */}
      <th scope="row" className="px-6 py-4 font-medium text-gray-900">
        {index}
      </th>

      {/* Title Column */}
      <td
        onClick={handleClick}
        className="px-6 py-4 hover:bg-gray-50 coursor-pointer "
      >
        {title}
      </td>

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
          onClick={handlePublish}
          className={`text-sm font-medium ${
            blog.isPublished
              ? "text-yellow-600 hover:text-yellow-900"
              : "text-green-600 hover:text-green-900"
          }`}
        >
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>
        <button onClick={handleDelete}>
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
