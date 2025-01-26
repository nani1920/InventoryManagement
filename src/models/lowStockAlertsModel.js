/** @format */

import mongoose from "mongoose";

const lowStockTransactionSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
  },
  reorderLevel: {
    type: Number,
    required: true,
  },
  alterDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Reordered"],
    required: true,
  },
  remarks: {
    type: String,
    required: true,
  },
});

const lowStockTransaction = mongoose.model(
  "LowStockTransaction",
  lowStockTransactionSchema
);
export default lowStockTransaction;
