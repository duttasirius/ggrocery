import express from "express";
import authUser from "../middlewares/authuser.js";
import {
  createReview,
  deleteReview,
  getMyReview,
  getReviews,
  updateReview,
} from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.get("/", getReviews);
reviewRouter.get("/mine", authUser, getMyReview);
reviewRouter.post("/", authUser, createReview);
reviewRouter.put("/", authUser, updateReview);
reviewRouter.delete("/", authUser, deleteReview);

export default reviewRouter;
