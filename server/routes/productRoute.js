import express from "express";
import { upload } from "../configs/multer.js";
import authSeller from "../middlewares/authSeller.js";
import {
  addProduct,
  changeStock,
  productById,
  productList,
} from "../controllers/productController.js";
import { aiProductSearch } from "../controllers/aiSearchController.js";

const productRouter = express.Router();

productRouter.post("/add", upload.array("images", 5), authSeller, addProduct);
productRouter.get("/list", productList);
productRouter.post("/ai-search", aiProductSearch);
productRouter.get("/id", productById);
productRouter.post("/stock", changeStock);

export default productRouter;
