import express from "express";
import {
  getSubscribers,
  subscribeNewsletter,
} from "../controllers/UserController.js";
import authSeller from "../middlewares/authSeller.js";

const newsLetterRouter = express.Router();

newsLetterRouter.post("/subscribe", subscribeNewsletter);
newsLetterRouter.get("/all", authSeller, getSubscribers);

export default newsLetterRouter;
