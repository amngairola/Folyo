import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { blog_data } from "./../assets/assets";
import NotFoundPage from "./NotFoundPage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Blog = () => {
  //get the id from URL
  const { id } = useParams();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    //find the blog from data array
    const currnetBlog = blog_data.find((post) => post._id === id);

    if (currnetBlog) {
      setBlog(currnetBlog);
      console.log(currnetBlog);
    }
    //useEffect run whenever the 'id' from the url changes
  }, [id]);

  if (!blog) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Navbar />
      <div className="bg-white py-12 sm:py-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-8 sm:mb-12">
            <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
              {blog.category}
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
              {blog.title}
            </h1>
            <p className="mt-4 text-lg text-gray-600">{blog.subTitle}</p>
            <p className="mt-6 text-sm text-gray-500">
              Published on{" "}
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </header>

          {/* Improved Image Section */}
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full aspect-video object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            />
          </div>

          {/* Improved Description Section */}
          <div
            className="prose prose-lg max-w-none mt-8 sm:mt-12 prose-p:leading-relaxed prose-headings:font-bold prose-headings:text-gray-900"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          ></div>
        </article>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
