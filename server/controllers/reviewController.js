import CustomerReview from "../models/CustomerReview.js";
import User from "../models/User.js";

const validateReview = (rating, text) => {
  const parsedRating = Number(rating);
  const cleanText = typeof text === "string" ? text.trim() : "";

  if (!Number.isInteger(parsedRating) || parsedRating < 1 || parsedRating > 5) {
    return { error: "Rating must be between 1 and 5" };
  }

  if (cleanText.length < 8 || cleanText.length > 500) {
    return { error: "Review must be between 8 and 500 characters" };
  }

  return { parsedRating, cleanText };
};

export const getReviews = async (req, res) => {
  try {
    const { productId } = req.query;
    const filter = productId ? { product: productId } : {};

    const reviews = await CustomerReview.find(filter)
      .sort({ createdAt: -1 })
      .select("name rating text createdAt user product");

    return res.json({ success: true, reviews });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Failed to fetch reviews" });
  }
};

export const getMyReview = async (req, res) => {
  try {
    const { productId } = req.query;
    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const review = await CustomerReview.findOne({
      user: req.userId,
      product: productId,
    }).select("name rating text createdAt user product");

    return res.json({ success: true, review });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Failed to fetch your review" });
  }
};

export const createReview = async (req, res) => {
  try {
    const { productId, rating, text } = req.body;
    const validation = validateReview(rating, text);

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    if (validation.error) {
      return res.status(400).json({ success: false, message: validation.error });
    }

    const user = await User.findById(req.userId).select("name");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const existingReview = await CustomerReview.findOne({
      user: req.userId,
      product: productId,
    });

    if (existingReview) {
      return res.status(409).json({ success: false, message: "You have already reviewed this product" });
    }

    const review = await CustomerReview.create({
      user: req.userId,
      product: productId,
      name: user.name,
      rating: validation.parsedRating,
      text: validation.cleanText,
    });

    return res.status(201).json({ success: true, review });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Failed to submit review" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { productId, rating, text } = req.body;
    const validation = validateReview(rating, text);

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    if (validation.error) {
      return res.status(400).json({ success: false, message: validation.error });
    }

    const review = await CustomerReview.findOneAndUpdate(
      { user: req.userId, product: productId },
      { rating: validation.parsedRating, text: validation.cleanText },
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
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const review = await CustomerReview.findOneAndDelete({
      user: req.userId,
      product: productId,
    });

    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    return res.json({ success: true, message: "Review deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Failed to delete review" });
  }
};
