// add address api/address/add

import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const newAddress = await Address.create({
      ...req.body,
      userId: req.userId,
    });

    console.log(" ADDRESS CREATED:", newAddress);

    return res.json({
      success: true,
      message: "ADDRESS ADDED",
      newAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// get address
export const getAddress = async (req, res) => {
  try {
    const address = await Address.find({ userId: req.user.id });

    res.json({
      success: true,
      address,
    });
  } catch (error) {
    console.log(error);
  }
};
