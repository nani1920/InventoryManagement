/** @format */

import LowStockTransaction from "../models/lowStockAlertsModel.js";
import mongoose from "mongoose";

export const getAllLowStockAlerts = async (request, response) => {
  try {
    const lowStockAlerts = await LowStockTransaction.find();
    response.status(200).json(lowStockAlerts);
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

export const postLowStockAlert = async (request, response) => {
  const { productId, stockQuantity, reorderLevel, status, remarks } =
    request.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return response
        .status(400)
        .json({ message: "Invalid Product ID format" });
    }

    if (stockQuantity <= reorderLevel) {
      return response.status(400).json({
        message: "Stock quantity cannot be below reorder level",
      });
    }

    if (!["Pending", "Reordered"].includes(status)) {
      return response.status(400).json({ message: "Invalid Status" });
    }

    if (!remarks || remarks.trim() === "") {
      return response.status(400).json({ message: "Invalid Remarks field" });
    }

    const newLowStockAlert = new LowStockTransaction({
      productId,
      stockQuantity,
      reorderLevel,
      status,
      remarks,
    });

    const savedLowStockAlert = await newLowStockAlert.save();

    response.status(201).json({
      message: "Low stock alert created successfully",
      createdLowStockAlert: savedLowStockAlert,
    });
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

export const updateLowStockAlertStatus = async (request, response) => {
  const { id } = request.params;
  const { status } = request.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: "Invalid Alert ID format" });
  }

  try {
    if (!["Pending", "Reordered"].includes(status)) {
      return response.status(400).json({ message: "Invalid Status" });
    }

    const lowStockAlert = await LowStockTransaction.findById(id);
    if (!lowStockAlert) {
      return response.status(404).json({ message: "Alert not found" });
    }

    lowStockAlert.status = status;
    await lowStockAlert.save();

    response.status(200).json({
      message: "Low stock alert status updated",
      updatedLowStockAlert: lowStockAlert,
    });
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};
