import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = ["http://localhost:3000"];
// DATABASE CONNECTION
await connectDB();

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (req, res) => res.send("API IS WORKING"));
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
