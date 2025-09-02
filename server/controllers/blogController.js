import fs from "fs";
import imagekit from "../config/imageKit.js";
import Blog from "../models/blog.js";
export const createBlog = async (req, res) => {
  try {
    // Parse the blog's text data from the form
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );

    // Get the uploaded image file from Multer
    const imageFile = req.file;

    // Check if all required fields are present
    if (
      !title ||
      !subTitle ||
      !description ||
      !category ||
      !imageFile ||
      isPublished === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Read the image file from its temporary path
    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload the image file to ImageKit
    const imageKitResponse = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // Generate an optimized URL for the uploaded image
    const optimizedImageUrl = imagekit.url({
      path: imageKitResponse.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    // Create a new blog post in the database
    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageUrl, // Save the optimized image URL
      isPublished,
    });

    res.json({
      success: true,
      message: "Blog created successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
