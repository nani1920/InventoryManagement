/** @format */

import StockTransaction from "../models/stockTransactionModel.js";
import mongoose from "mongoose";

export const getAllStockTransactions = async (request, response) => {
  try {
    const transactions = await StockTransaction.find();
    if (!transactions) {
      return response.status(404).json({ message: "No Transactions Found" });
    }
    response.status(200).json(transactions);
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

export const postStockTransaction = async (request, response) => {
  const { productId, transactionType, quantity, remarks } = request.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return response
        .status(400)
        .json({ message: "Invalid Product ID format" });
    }

    if (!transactionType || !["IN", "OUT"].includes(transactionType)) {
      return response.status(400).json({ message: "Invalid Transaction Type" });
    }

    if (!quantity || quantity <= 0) {
      return response.status(400).json({ message: "Invalid Quantity" });
    }

    if (!remarks || remarks.trim() === "") {
      return response.status(400).json({ message: "Invalid Remarks field" });
    }

    const newTransaction = new StockTransaction({
      productId,
      transactionType,
      quantity,
      remarks,
    });

    const savedTransaction = await newTransaction.save();

    response.status(201).json({
      message: "Successfully recorded the stock transaction",
      createdTransaction: savedTransaction,
    });
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

export const getStockTransactionById = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response
      .status(400)
      .json({ message: "Invalid Transaction ID format" });
  }

  try {
    const transaction = await StockTransaction.findById(id);
    if (!transaction) {
      return response.status(404).json({ message: "Transaction not found" });
    }
    response.status(200).json(transaction);
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};
