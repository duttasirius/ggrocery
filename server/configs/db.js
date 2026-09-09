import mongoose from "mongoose";
import "../models/CustomerReview.js";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("DATABASE CONNECTED"),
    );

    await mongoose.connect(`${process.env.MONGODB_URI}/groceryy`);

    // Keep the review indexes in sync after changing from one global review
    // per user to one review per user per product.
    const CustomerReview = mongoose.model("customerReview");
    await CustomerReview.syncIndexes();
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
