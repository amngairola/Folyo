import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { blog_data } from "./../assets/assets";
import NotFoundPage from "./NotFoundPage";

const Blog = () => {
  //get the id from URL
  const { id } = useParams();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    //find the blog from data array
    const currnetBlog = blog_data.find((post) => post._id === id);

    if (currnetBlog) {
      setBlog(currnetBlog);
    }
    //useEffect run whenever the 'id' from the url changes
  }, [id]);

  if (!blog) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <img src={blog.image} alt={blog.title} />
    </div>
  );
};

export default Blog;
