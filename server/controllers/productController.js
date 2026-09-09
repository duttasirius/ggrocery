import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";
import fs from "fs";

// add product : api/product/add
export const addProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData);
    const images = req.files;

    if (!images || images.length !== 4) {
      return res.status(400).json({
        success: false,
        message: "Please upload exactly 4 product images",
      });
    }

    const imagesUrl = await Promise.all(
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
    res.status(500).json({ message: error.message });
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

    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
  }
};

// change product stock : api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    const product = await Product.findByIdAndUpdate(id, { inStock }, { new: true });

    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
