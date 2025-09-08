import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { assets } from "./../assets/assets";
import NotFoundPage from "./NotFoundPage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ShareButtons from "../components/ShareButtons";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  // State for the blog, comments, and loading status
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for the comment form
  const [commentData, setCommentData] = useState({
    userName: "",
    userText: "",
  });
  const [isCommentVisible, setIsCommentVisible] = useState(true);

  // This hook runs when the component mounts or when the blog 'id' changes
  useEffect(() => {
    // Define an async function to fetch all necessary data for the page
    const fetchData = async () => {
      try {
        setLoading(true); // Show the loader while fetching

        // Use Promise.all to fetch blog details and comments simultaneously for better performance
        const [blogRes, commentsRes] = await Promise.all([
          axios.get(`/api/blog/${id}`),
          axios.get(`/api/blog/comments/${id}`),
        ]);

        // Handle the response for the blog post
        if (blogRes.data.success) {
          setBlog(blogRes.data.blog);
        } else {
          toast.error(blogRes.data.message);
        }

        // Handle the response for the comments
        if (commentsRes.data.success) {
          setComments(commentsRes.data.comments);
        }
      } catch (error) {
        toast.error("Failed to load post.");
      } finally {
        // This block runs regardless of success or failure, ensuring the loader is always hidden
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // The dependency array ensures this effect re-runs if the blog ID in the URL changes

  // A single, reusable handler for updating the comment form state
  const handleCommentDataChange = (e) => {
    const { name, value } = e.target;
    setCommentData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handler for submitting a new comment to the backend
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent the default browser form submission
    try {
      const { data } = await axios.post(`/api/blog/add-comment`, {
        blogId: id,
        name: commentData.userName,
        content: commentData.userText,
      });

      if (data.success) {
        toast.success("Comment added for review");
        setCommentData({ userName: "", userText: "" }); // Reset the form
        // You could optionally refetch comments here to show the new one instantly
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to post comment.");
    }
  };

  // --- Conditional Rendering ---

  // If data is still being fetched, show the loader component
  if (loading) {
    return <Loader />;
  }

  // If loading is finished but the blog was not found, show the 404 page
  if (!blog) {
    return <NotFoundPage />;
  }
  console.log("Current comments state:", comments);
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            {/* Author and Post Content */}
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <p className="font-semibold text-gray-900">Aman Gairola</p>
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
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                {blog.title}
              </h1>
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full mt-4 rounded-md"
              />
              <div
                className="prose prose-lg max-w-none mt-4"
                dangerouslySetInnerHTML={{ __html: blog.description }}
              ></div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between border-t border-gray-200 px-4 py-2 sm:px-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setIsCommentVisible(!isCommentVisible)}
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
                  Comment ({comments.length})
                </button>
              </div>
              <ShareButtons url={window.location.href} title={blog.title} />
            </div>

            {/* Comment Section */}
            {isCommentVisible && (
              <div className="border-t border-gray-200 p-4 sm:p-6">
                {/* "Add Comment" Form */}
                <form onSubmit={handleFormSubmit} className="space-y-3 mb-6">
                  <input
                    name="userName"
                    value={commentData.userName}
                    type="text"
                    onChange={handleCommentDataChange}
                    placeholder="Your Name"
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                  />
                  <textarea
                    name="userText"
                    value={commentData.userText}
                    rows="3"
                    placeholder="Add a comment..."
                    required
                    onChange={handleCommentDataChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                  ></textarea>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-full bg-green-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700"
                    >
                      Post
                    </button>
                  </div>
                </form>

                {/* Display Existing Comments */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment._id} className="flex items-start gap-3">
                      {/* Username (does not shrink) */}
                      <p className="font-semibold text-sm flex-shrink-0">
                        {comment.name}:
                      </p>

                      {/* Comment div (takes remaining space and wraps text) */}
                      <div className="bg-gray-100 p-3 rounded-lg flex-1">
                        <p className="text-gray-700 text-sm">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
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
