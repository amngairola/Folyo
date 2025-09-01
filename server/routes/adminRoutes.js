import express from "express";
import { adminLogin } from "./../controllers/adminController.js";

//create a modular router for admin API endpoints
const adminRouter = express.Router();

//when a POST request is sent to /login, the adminLogin function is executed to handle it

adminRouter.post("/login", adminLogin);

export default adminRouter;
