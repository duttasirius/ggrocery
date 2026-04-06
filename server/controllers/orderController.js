import Order from "../models/Order.js";
import Product from "../models/Product.js";

// PLACE ORDER COD : api/order/food
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.json({
        success: false,
        message: "INVALID DATA",
      });
    }

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

    const tax = Math.floor(amount * 0.02);
    amount += tax;

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    return res.json({
      success: true,
      message: "ORDER PLACED SUCCESSFULLY",
    });
  } catch (error) {
    console.error(error);
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
