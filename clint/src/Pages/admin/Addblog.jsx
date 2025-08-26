import React, { useState } from "react";

import { assets } from "../../assets/assets";

const Addblog = () => {
  const [image, setImage] = useState(null);

  const [blogData, setBlogData] = useState({
    title: "",
    subTitle: "",
    description: "",
    category: "Technology",
    isPublished: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setBlogData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", blogData.title);
    formData.append("subTitle", blogData.subTitle);
    formData.append("description", blogData.description);
    formData.append("category", blogData.category);
    formData.append("isPublished", blogData.isPublished);

    // Now we can send this formData to your backend API
    console.log("FormData ready to be sent:", ...formData.entries());

    // Reset form after submission
    setImage(null);
    setBlogData({
      title: "",
      subTitle: "",
      description: "",
      category: "Technology",
      isPublished: false,
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Add a New Blog Post</h1>

        <form
          onSubmit={handleSubmit}
          className="p-8 bg-white rounded-lg shadow-md space-y-8"
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Upload Image
              </label>
              <label htmlFor="image" className="cursor-pointer h-full">
                <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-colors hover:border-green-500">
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="h-40 object-contain"
                    />
                  ) : (
                    <img
                      src={assets.upload_area}
                      alt="Upload"
                      className="mx-auto h-12"
                    />
                  )}
                </div>
                <input
                  onChange={handleImageChange}
                  type="file"
                  id="image"
                  hidden
                  required
                />
              </label>
            </div>

            <div className="flex-1 flex flex-col gap-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  name="title"
                  value={blogData.title}
                  onChange={handleChange}
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-3 transition-shadow hover:shadow-md"
                />
              </div>
              <div>
                <label
                  htmlFor="subTitle"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sub-title
                </label>
                <input
                  name="subTitle"
                  value={blogData.subTitle}
                  onChange={handleChange}
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-3 transition-shadow hover:shadow-md"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              value={blogData.description}
              onChange={handleChange}
              rows="8"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-shadow hover:shadow-md"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Blog Category
              </label>
              <select
                name="category"
                value={blogData.category}
                onChange={handleChange}
                className="mt-1 block w-full md:w-1/2 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 transition-shadow hover:shadow-md"
              >
                <option value="Technology">Technology</option>
                <option value="Startup">Startup</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>
            <div className="flex items-center pt-6">
              <input
                type="checkbox"
                name="isPublished"
                checked={blogData.isPublished}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <label
                htmlFor="isPublished"
                className="ml-2 block text-sm text-gray-900"
              >
                Publish now
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-8 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Add Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
