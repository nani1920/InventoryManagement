/** @format */

import express from "express";

import {
  postProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();
router.post("/", postProduct);
router.get("/", getAllProducts);
router.get("/:productId", getProduct);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

export default router;
