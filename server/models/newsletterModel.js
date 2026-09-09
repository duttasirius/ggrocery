import mongoose from "mongoose";

const newsLetterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const newsLetterModel =
  mongoose.models.newsletter || mongoose.model("newsLetter", newsLetterSchema);

export default newsLetterModel;
