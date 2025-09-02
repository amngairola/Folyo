import express from "express";
// Import the Multer middleware for handling file uploads
import upload from "../middleware/multer.js";
// Import the controller function that creates the blog

import { createBlog } from "../controllers/blogController.js";
import auth from "../middleware/auth.js";

// Create a new router instance to manage blog-related routes
const blogRouter = express.Router();

// Define a route for handling the creation of a new blog post
blogRouter.post(
  "/add", // This route is triggered by a POST request to '/api/blogs/add' (assuming a prefix)
  upload.single("image"), // This middleware intercepts the request to process a single file from a form field named "image"
  auth, // This middleware checks if the user is authenticated before proceeding
  createBlog // After the file is processed, this controller function is called to handle the logic
);

export default blogRouter;
