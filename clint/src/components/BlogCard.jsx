import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const { _id, title, description, category, image } = blog;
  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      // We use 'group' here so we can do cool things to child elements on hover
      className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {/* This div keeps the image from overflowing the rounded corners */}
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title} // Good for accessibility and SEO!
          // This makes the image zoom in a little when the card is hovered
          className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        {/* A little badge for the category makes it pop */}
        <span className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
          {category}
        </span>

        <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>

        <p
          className="text-gray-600"
          dangerouslySetInnerHTML={{
            __html: description.slice(0, 80),
          }}
        ></p>
      </div>
    </div>
  );
};

export default BlogCard;
