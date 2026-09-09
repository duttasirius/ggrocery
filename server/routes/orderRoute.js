import express from "express";
import authUser from "../middlewares/authuser.js";
import {
  getAllOrders,
  getUsersOrders,
  placeOrderCOD,
  placeOrderStripe,
  verifyStripe,
} from "../controllers/orderController.js";
import authSeller from "../middlewares/authSeller.js";

const orderRouter = express.Router();

orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.get("/user", authUser, getUsersOrders);
orderRouter.get("/seller", authSeller, getAllOrders);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/verify-stripe", authUser, verifyStripe);

export default orderRouter;
