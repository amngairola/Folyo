import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { assets, blog_data } from "./../assets/assets";
import NotFoundPage from "./NotFoundPage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ShareButtons from "../components/ShareButtons";
import Loader from "../components/Loader";

const Blog = () => {
  // --- Hooks and State Management (No changes needed here) ---
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentData, setCommentData] = useState({
    userName: "",
    userText: "",
  });

  const [comment, visibleComment] = useState(false);

  useEffect(() => {
    const currentBlog = blog_data.find((post) => post._id === id);
    if (currentBlog) {
      setBlog(currentBlog);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!blog) {
    return <Loader />;
    return <NotFoundPage />;
  }

  const handleCommentData = (e) => {
    const { name, value } = e.target;
    setCommentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Comment Data:", commentData);
    setCommentData({ userName: "", userText: "" });
    visibleComment(!comment);
  };

  const currentUrl = window.location.href;
  // --- Updated JSX for LinkedIn-style UI ---

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* --- Main Blog Post Card --- */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            {/* Author Header */}
            <div className="flex items-center gap-4 p-4 sm:p-6">
              <div>
                <p className="font-semibold text-gray-900">Aman gairola</p>
                <p className="text-sm text-gray-500">
                  Published on{" "}
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-4 sm:px-6">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                {blog.title}
              </h1>
              <img src={blog.image} alt={blog.title} className="w-full mt-4" />
              <div
                className="prose prose-lg max-w-none mt-4"
                dangerouslySetInnerHTML={{ __html: blog.description }}
              ></div>
            </div>

            {/* Post Image */}

            {/* Action Bar (Like, Comment, Share) */}
            <div className="flex items-center justify-between border-t border-gray-200 px-4 py-2 sm:px-6">
              {/* Dummy Like and Comment buttons */}
              <div className="flex gap-4">
                {/* <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 18.236V6.22c0-.632.504-1.14 1.12-1.18.6-.04 1.12.427 1.12 1.02V18l3.75-3.75zM12 6V5a3 3 0 00-3-3H6a3 3 0 00-3 3v9a3 3 0 003 3h1.438M12 6l-2-4-2 4h4z"
                    />
                  </svg>
                  Like
                </button> */}
                <button
                  onClick={() => visibleComment(!comment)}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Comment
                </button>
              </div>
              <ShareButtons url={currentUrl} title={blog.title} />
            </div>

            {/* Comment Form */}

            {comment && (
              <div className="border-t border-gray-200 p-4 sm:p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Leave a Comment
                </h3>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <input
                    name="userName"
                    value={commentData.userName}
                    type="text"
                    onChange={handleCommentData}
                    placeholder="Your Name"
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                  <textarea
                    name="userText"
                    value={commentData.userText}
                    rows="4"
                    placeholder="Share your thoughts..."
                    required
                    onChange={handleCommentData}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  ></textarea>
                  <div className="flex justify-end">
                    <button type="submit">
                      <img
                        src={assets.submit_icon}
                        alt="Submit Comment"
                        className="w-10 h-10 cursor-pointer hover:opacity-80"
                      />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
