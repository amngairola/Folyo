import express from "express";
import {
  adminLogin,
  approveCommentById,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllCommentsAdmin,
  getDashboardAdmin,
} from "./../controllers/adminController.js";
import auth from "../middleware/auth.js";

//create a modular router for admin API endpoints
const adminRouter = express.Router();

//when a POST request is sent to /login, the adminLogin function is executed to handle it

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", auth, getAllCommentsAdmin);
adminRouter.get("/blogs", getAllBlogsAdmin);
adminRouter.post("/delete-comment", deleteCommentById);
adminRouter.post("/approve-comment", approveCommentById);
adminRouter.get("/dashboard", getDashboardAdmin);

export default adminRouter;
