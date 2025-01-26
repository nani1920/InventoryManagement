/** @format */

import express from "express";
import {
  getAllStockTransactions,
  postStockTransaction,
  getStockTransactionById,
} from "../controllers/stockTransactionController.js"; // Adjust the path to your controllers as needed

const router = express.Router();

// GET /api/transactions
// Fetch all stock transactions
router.get("/", getAllStockTransactions);

// POST /api/transactions
// Record a new stock transaction
router.post("/", postStockTransaction);

// GET /api/transactions/:id
// Get a specific stock transaction by its ID
router.get("/:id", getStockTransactionById);

export default router;
