import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";
import fs from "fs";

// add product : api/product/add
export const addProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData); // ✅ FIX

    const images = req.files;

    if (!images || images.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });

        fs.unlinkSync(item.path);

        return result.secure_url;
      }),
    );

    const newProduct = await Product.create({
      ...productData,
      image: imagesUrl,
    });

    return res.json({
      success: true,
      message: "PRODUCT CREATED",
      newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message }); // better debugging
  }
};

// get product : api/product/list
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});

    return res.json({
      success: true,
      message: "PRODUCT FOUND",
      products,
    });
  } catch (error) {
    console.log(error);
  }
};

// get single product : api/product/id
export const productById = async (req, res) => {
  try {
    const { id } = req.body;

    const product = await Product.findById(id);

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
  }
};

// change product stock : api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { inStock },
      { new: true },
    );

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
