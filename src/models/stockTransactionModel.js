/** @format */

import mongoose from "mongoose";

const StockTransactionSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  transactionType: {
    type: String,
    enum: ["IN", "OUT"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  remarks: {
    type: String,
    required: true,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
});

const StockTransaction = mongoose.model(
  "StockTransaction",
  StockTransactionSchema
);
export default StockTransaction;
