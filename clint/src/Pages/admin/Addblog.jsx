import React, { useEffect, useRef, useState } from "react";

import { assets } from "../../assets/assets";
import Quill from "quill";
import toast from "react-hot-toast";

import { useAppContext } from "../../context/AppContext";
import Loader from "../../components/Loader";

const Addblog = () => {
  // State specifically for the image file
  const [image, setImage] = useState(null);

  // State for text-based form fields, grouped for easy management
  const [blogData, setBlogData] = useState({
    title: "",
    subTitle: "",
    category: "Technology",
    isPublished: false,
  });

  // State specifically for the Quill editor's HTML content
  const [description, setDescription] = useState("");

  // State to manage the loading status of the form submission
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get the pre-configured axios instance from the global context
  const { axios } = useAppContext();

  // Refs to hold the Quill editor container and the Quill instance itself
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const handleGenerateWithAi = () => {
    console.log("genrate With Ai working");
  };

  // Initialize the Quill editor once on component mount
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your blog description here...",
      });

      // Listen for changes in the editor and sync its content with the React state
      quillRef.current.on("text-change", () => {
        const html = quillRef.current.root.innerHTML;
        setDescription(html);
      });
    }
  }, []);

  // Generic handler for standard form inputs (text, select, checkbox)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handler specifically for the file input
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handler for submitting the form to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    setIsLoading(true);

    try {
      // Consolidate all text data into a single object
      const blog = {
        title: blogData.title,
        subTitle: blogData.subTitle,
        description: description,
        category: blogData.category,
        isPublished: blogData.isPublished,
      };

      // Create a FormData object to handle the file upload
      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      // Send the form data to the backend API
      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message);
        // Reset all form fields to their initial state
        setImage(null);
        setBlogData({
          title: "",
          subTitle: "",
          category: "Technology",
          isPublished: false,
        });
        if (quillRef.current) {
          // Correctly clear the Quill editor's content
          quillRef.current.setText("");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to add blog post.");
    } finally {
      // Ensure the loading state is reset, even if the request fails
      setIsAdding(false);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Add a New Blog Post</h1>

        <form
          id="form"
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
                  id="title"
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
                  id="subTitle"
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
          {/* ---------- description text editor */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>

            {/* Styled container for the Quill editor */}
            <div
              id="description"
              ref={editorRef}
              style={{ minHeight: "250px" }}
            ></div>

            {/* Styled "Generate with AI" button */}
            <button
              type="button" // Use type="button" to prevent form submission
              onClick={handleGenerateWithAi}
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Generate with AI
              {/* Optional: Add a spark icon for better UI */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 3.5a1.5 1.5 0 013 0V5a1 1 0 001 1h1.5a1.5 1.5 0 010 3H14a1 1 0 00-1 1v1.5a1.5 1.5 0 01-3 0V10a1 1 0 00-1-1H7.5a1.5 1.5 0 010-3H9a1 1 0 001-1V3.5zM3.5 10a1.5 1.5 0 010-3H5a1 1 0 001-1V4.5a1.5 1.5 0 013 0V6a1 1 0 001 1h1.5a1.5 1.5 0 010 3H10a1 1 0 00-1 1v1.5a1.5 1.5 0 01-3 0V12a1 1 0 00-1-1H3.5z" />
              </svg>
            </button>
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
              disabled={isAdding}
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-8 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              {isAdding ? "adding blog..." : "Add Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
