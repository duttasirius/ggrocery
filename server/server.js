import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import newsLetterRouter from "./routes/newsLetterRoute.js";
import reviewRouter from "./routes/reviewRoute.js";

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

await connectDB();
await connectCloudinary();

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser/server-to-server requests.
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.get("/", (req, res) => res.send("API IS WORKING"));
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRoute);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);
app.use("/api/newsletter", newsLetterRouter);
app.use("/api/reviews", reviewRouter);

// Vercel uses the exported Express app as the serverless entry point.
export default app;

// Keep the normal local development server working.
if (process.env.VERCEL !== "1") {
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
}
