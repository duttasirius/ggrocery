// update user cart-data

import User from "../models/User.js";

export const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { cartItems } = req.body;

    await User.findByIdAndUpdate(userId, { cartItems });

    return res.json({
      success: true,
      message: "CART UPDATED",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
