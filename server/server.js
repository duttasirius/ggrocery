import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = [];

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (req, res) => res.send("API IS WORKING"));

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
