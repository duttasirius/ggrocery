import mongoose from "mongoose";

const customerReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      maxlength: 500,
    },
  },
  { timestamps: true },
);

customerReviewSchema.index({ user: 1, product: 1 }, { unique: true });

const CustomerReview = mongoose.model("customerReview", customerReviewSchema);

export default CustomerReview;
