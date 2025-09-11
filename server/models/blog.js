import mongoose from "mongoose";

// Define the structure and rules for the 'blog' collection in MongoDB
const blogSchema = new mongoose.Schema(
  {
    // The main title of the blog post
    title: {
      type: String,
      required: true,
    },
    // A shorter subtitle for the blog post
    subTitle: {
      required: true,
      type: String,
    },
    // The full content of the blog post (often HTML from a rich text editor)
    description: {
      required: true,
      type: String,
    },
    // The category of the blog post (e.g., "Technology", "Lifestyle")
    category: {
      required: true,
      type: String,
    },
    // The URL of the blog's cover image
    image: {
      required: true,
      type: String,
    },
    // A boolean to determine if the blog is live or a draft
    isPublished: {
      required: true,
      type: Boolean,
    },
  },
  // Automatically add 'createdAt' and 'updatedAt' timestamp fields
  { timestamps: true }
);

// Create the Mongoose model based on the schema
const Blog = mongoose.model("blog", blogSchema);

export default Blog;
