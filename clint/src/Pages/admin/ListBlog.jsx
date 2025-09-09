import React, { useEffect, useState } from "react";

import BlogTable from "../../components/admin/BlogTable";

import { useAppContext } from "../../context/AppContext";
const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);

  const { axios } = useAppContext();

  const fetchBlog = async () => {
    try {
      const { data } = await axios.get("/api/admin/blogs");
      if (data.success) {
        console.log(data);
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">All Blogs</h1>

      {/* Add a container with a fixed height and vertical scroll */}
      <div
        className="overflow-y-auto border border-gray-200 rounded-lg shadow-sm"
        style={{ maxHeight: "60vh" }}
      >
        <table className="min-w-full divide-y divide-gray-200">
          {/* Make the table header sticky */}
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                SNo
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.map((blog, index) => (
              <BlogTable
                key={blog._id}
                blog={blog}
                fetchBlog={fetchBlog}
                index={index + 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListBlog;
