import React, { useEffect } from "react";
import { assets, dashboard_data } from "../../assets/assets";
import BlogTable from "../../components/admin/BlogTable";

const DashBoard = () => {
  const [dashBoardData, setDashBoardData] = React.useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });
  const fetchDashBoard = () => {
    setDashBoardData(dashboard_data);
  };
  useEffect(() => {
    fetchDashBoard();
  }, []);

  return (
    <div>
      {/* Stat Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Blogs Card */}
        <div className="flex items-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <img
            src={assets.dashboard_icon_1}
            alt="Blogs"
            className="w-12 h-12 mr-5"
          />
          <div>
            <h3 className="text-3xl font-bold text-gray-900">
              {dashBoardData.blogs}
            </h3>
            <p className="text-gray-500">Blogs</p>
          </div>
        </div>

        {/* Comments Card */}
        <div className="flex items-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <img
            src={assets.dashboard_icon_2}
            alt="Comments"
            className="w-12 h-12 mr-5"
          />
          <div>
            <h3 className="text-3xl font-bold text-gray-900">
              {dashBoardData.comments}
            </h3>
            <p className="text-gray-500">Comments</p>
          </div>
        </div>

        {/* Drafts Card */}
        <div className="flex items-center p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <img
            src={assets.dashboard_icon_3}
            alt="Drafts"
            className="w-12 h-12 mr-5"
          />
          <div>
            <h3 className="text-3xl font-bold text-gray-900">
              {dashBoardData.drafts}
            </h3>
            <p className="text-gray-500">Drafts</p>
          </div>
        </div>
      </div>

      {/* Recent Blogs Table Section */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 flex items-center gap-4">
          <img
            src={assets.dashboard_icon_4}
            alt="Recent Blogs"
            className="w-8 h-8"
          />
          <h2 className="text-xl font-semibold text-gray-900">Recent Blogs</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
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
              {dashBoardData.recentBlogs.map((blog, index) => (
                <BlogTable
                  key={blog._id}
                  blog={blog}
                  fetchBlog={fetchDashBoard}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
