// update user cart-data

import User from "../models/User.js";

export const updateCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;

    await User.findByIdAndUpdate(userId, { cartItems });

    return res.json({
      success: true,
      message: "CART UPDATED",
    });
  } catch (error) {
    console.log(error);
  }
};
