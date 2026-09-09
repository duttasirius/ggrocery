import CustomerReview from "../models/CustomerReview.js";
import User from "../models/User.js";

export const getReviews = async (req, res) => {
  try {
    const reviews = await CustomerReview.find({})
      .sort({ createdAt: -1 })
      .select("name rating text createdAt user");

    return res.json({ success: true, reviews });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Failed to fetch reviews" });
  }
};

export const getMyReview = async (req, res) => {
  try {
    const review = await CustomerReview.findOne({ user: req.userId }).select(
      "name rating text createdAt user",
    );

    return res.json({ success: true, review });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Failed to fetch your review" });
  }
};

export const createReview = async (req, res) => {
  try {
    const { rating, text } = req.body;
    const parsedRating = Number(rating);
    const cleanText = typeof text === "string" ? text.trim() : "";

    if (!Number.isInteger(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
    }

    if (cleanText.length < 8 || cleanText.length > 500) {
      return res.status(400).json({ success: false, message: "Review must be between 8 and 500 characters" });
    }

    const user = await User.findById(req.userId).select("name");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const existingReview = await CustomerReview.findOne({ user: req.userId });
    if (existingReview) {
      return res.status(409).json({ success: false, message: "You have already submitted a review" });
    }

    const review = await CustomerReview.create({
      user: req.userId,
      name: user.name,
      rating: parsedRating,
      text: cleanText,
    });

    return res.status(201).json({ success: true, review });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Failed to submit review" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { rating, text } = req.body;
    const parsedRating = Number(rating);
    const cleanText = typeof text === "string" ? text.trim() : "";

    if (!Number.isInteger(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
    }

    if (cleanText.length < 8 || cleanText.length > 500) {
      return res.status(400).json({ success: false, message: "Review must be between 8 and 500 characters" });
    }

    const review = await CustomerReview.findOneAndUpdate(
      { user: req.userId },
      { rating: parsedRating, text: cleanText },
      { new: true, runValidators: true },
    );

    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    return res.json({ success: true, review });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Failed to update review" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await CustomerReview.findOneAndDelete({ user: req.userId });

    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    return res.json({ success: true, message: "Review deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Failed to delete review" });
  }
};
