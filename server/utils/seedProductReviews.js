import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../configs/db.js";
import Product from "../models/Product.js";
import CustomerReview from "../models/CustomerReview.js";

const reviewNames = [
  "Aarav Sharma",
  "Priya Das",
  "Rohan Mehta",
  "Sneha Roy",
  "Ananya Singh",
  "Vikram Patel",
  "Neha Kapoor",
  "Arjun Nair",
];

const reviewTexts = [
  "Fresh quality and exactly what I expected. The packaging was neat too.",
  "Really happy with the quality. It arrived fresh and was worth the price.",
  "Good product and good value for money. I would definitely order it again.",
  "The product was fresh, well packed, and delivered without any issues.",
  "Great quality for the price. It has become a regular item in my grocery basket.",
  "Very satisfied with this purchase. The product matched the description perfectly.",
  "Fresh and good quality. Delivery was smooth and the item arrived in great condition.",
  "A reliable grocery choice. Good freshness, fair pricing, and a pleasant experience.",
];

const seedProductReviews = async () => {
  try {
    await connectDB();

    const products = await Product.find({}).select("_id name");
    if (!products.length) {
      console.log("No products found. Nothing to seed.");
      return;
    }

    let created = 0;
    let skipped = 0;

    for (let productIndex = 0; productIndex < products.length; productIndex += 1) {
      const product = products[productIndex];
      const existingCount = await CustomerReview.countDocuments({ product: product._id });

      if (existingCount >= 2) {
        console.log(`Skipping ${product.name}: already has ${existingCount} reviews.`);
        skipped += 1;
        continue;
      }

      const targetCount = Math.min(8, Math.max(2, 2 + (productIndex % 7)));
      const needed = targetCount - existingCount;
      const existingNames = new Set(
        (await CustomerReview.find({ product: product._id }).select("name")).map(
          (review) => review.name,
        ),
      );

      for (let reviewIndex = 0; reviewIndex < needed; reviewIndex += 1) {
        const nameIndex = (productIndex + reviewIndex) % reviewNames.length;
        let name = reviewNames[nameIndex];

        if (existingNames.has(name)) {
          name = `${reviewNames[nameIndex]} ${productIndex + reviewIndex + 1}`;
        }

        const rating = 4 + ((productIndex + reviewIndex) % 2);
        const text = reviewTexts[(productIndex + reviewIndex) % reviewTexts.length];
        const userId = new mongoose.Types.ObjectId();

        await CustomerReview.create({
          user: userId,
          product: product._id,
          name,
          rating,
          text,
        });

        existingNames.add(name);
        created += 1;
      }

      console.log(`Seeded ${needed} reviews for ${product.name}.`);
    }

    console.log(`\nReview seeding complete. Created: ${created}, skipped: ${skipped}.`);
  } catch (error) {
    console.error("REVIEW SEED ERROR:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedProductReviews();
