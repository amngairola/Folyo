import express from "express";
import { subscribeNewsletter } from "../controllers/newsletterController.js";

const newsLetterRouter = express.Router();

newsLetterRouter.post("/subscribe", subscribeNewsletter);

export default newsLetterRouter;
