import { COD_ORDER_CONFIRMATION_TEMPLATE } from "../configs/emailTemplates.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Stripe from "stripe";
import User from "../models/User.js";
import transporter from "../configs/nodemailer.js";

const currency = "inr";
const deliveryCharge = 10;

// -----GATEWAY INITIALIZE
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, address } = req.body;

    // Validate request data
    if (!address || !items || items.length === 0) {
      return res.json({
        success: false,
        message: "INVALID DATA",
      });
    }

    // Get user
    const user = await User.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "USER NOT FOUND",
      });
    }

    // Calculate total amount
    let amount = 0;

    for (const item of items) {
      if (item.quantity <= 0) {
        return res.json({
          success: false,
          message: "INVALID QUANTITY",
        });
      }

      const product = await Product.findById(item.product);

      if (!product) {
        return res.json({
          success: false,
          message: "PRODUCT NOT FOUND",
        });
      }

      amount += product.offerPrice * item.quantity;
    }

    // Add tax
    const tax = Math.floor(amount * 0.02);
    amount += tax;

    // Create order
    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    // Send confirmation email
    try {
      const html = COD_ORDER_CONFIRMATION_TEMPLATE.replace(
        "{{name}}",
        user.name,
      )
        .replace("{{orderId}}", order._id.toString())
        .replace("{{amount}}", amount)
        .replace("{{websiteUrl}}", process.env.CLIENT_URL);

      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: `Order Confirmed #${order._id}`,
        html,
      });

      console.log(`Order confirmation email sent to ${user.email}`);
    } catch (mailError) {
      console.error("EMAIL ERROR:", mailError);
    }

    return res.json({
      success: true,
      message: "ORDER PLACED SUCCESSFULLY",
      orderId: order._id,
    });
  } catch (error) {
    console.error("PLACE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "SERVER ERROR",
    });
  }
};

export const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, address } = req.body;
    const { origin } = req.headers;

    if (!address || !items || items.length === 0) {
      return res.json({
        success: false,
        message: "INVALID DATA",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "USER NOT FOUND",
      });
    }

    let amount = 0;
    const line_items = [];

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.json({
          success: false,
          message: "PRODUCT NOT FOUND",
        });
      }

      amount += product.offerPrice * item.quantity;

      line_items.push({
        price_data: {
          currency: currency,
          product_data: {
            name: product.name,
          },
          unit_amount: product.offerPrice * 100,
        },
        quantity: item.quantity,
      });
    }

    // Tax
    const tax = Math.floor(amount * 0.02);
    amount += tax;

    // Create order first
    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Stripe",
    });

    // Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",

      success_url: `${origin}/verify?success=true&orderId=${order._id}`,

      cancel_url: `${origin}/verify?success=false&orderId=${order._id}`,

      metadata: {
        orderId: order._id.toString(),
      },
    });

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.error("STRIPE ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "SERVER ERROR",
    });
  }
};

// stripe confirmation payment
export const verifyStripe = async (req, res) => {
  try {
    const { orderId, success } = req.body;

    if (success === "true") {
      const order = await Order.findByIdAndUpdate(
        orderId,
        {
          isPaid: true,
        },
        { new: true },
      );

      await User.findByIdAndUpdate(order.userId, {
        cartItems: {},
      });

      return res.json({
        success: true,
        message: "Payment Successful",
      });
    }

    await Order.findByIdAndDelete(orderId);

    return res.json({
      success: false,
      message: "Payment Failed",
    });
  } catch (error) {
    console.error("VERIFY STRIPE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "SERVER ERROR",
    });
  }
};

// GET ORDERS BY USERID : api/order/user
export const getUsersOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "SERVER ERROR",
    });
  }
};

// GET ALL ORDERS FOR ADMIN : /api/order/seller
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "SERVER ERROR",
    });
  }
};
