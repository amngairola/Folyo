import jwt from "jsonwebtoken";
import Blog from "../models/blog.js";
import comment from "../models/comment.js";

// --- Admin Login Controller ---
export const adminLogin = async (req, res) => {
  try {
    console.log("req successfull");
    // You should log req.body directly
    console.log(req.body);
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // If login is successful, create a JWT for authentication
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// --- Get All Blogs for Admin Panel ---
export const getAllBlogsAdmin = async (req, res) => {
  try {
    // Fetch all blogs from the database, sorted by most recent
    const blogs = await Blog.find({}).sort({
      createdAt: -1,
    });
    res.json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// --- Get All Comments for Admin Panel ---
export const getAllCommentsAdmin = async (req, res) => {
  try {
    // Fetch all comments and populate the 'blog' field to get related blog details
    const comments = await comment.find({}).populate("blog").sort({
      createdAt: -1,
    });
    res.json({
      success: true,
      comments,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// --- Get Dashboard Data ---
export const getDashboardAdmin = async (req, res) => {
  try {
    // Get the 5 most recent blog posts
    const recentBlogs = await Blog.find({})
      .sort({
        createdAt: -1,
      })
      .limit(5);

    // Get counts for total blogs, comments, and drafts
    const totalBlogs = await Blog.countDocuments();
    const totalComments = await comment.countDocuments();
    const totalDrafts = await Blog.countDocuments({
      isPublished: false,
    });

    // Combine all dashboard data into one object
    const dashBoardData = {
      recentBlogs,
      totalBlogs,
      totalDrafts,
      totalComments,
    };

    res.json({
      success: true,
      dashBoardData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// --- Delete a Comment by ID ---
export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    // Find the comment by its ID and delete it
    await comment.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// --- Approve a Comment by ID ---
export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    // Find the comment by ID and update its isApproved status to true
    await comment.findByIdAndUpdate(id, { isApproved: true });

    res.json({
      success: true,
      message: "Comment approved successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
