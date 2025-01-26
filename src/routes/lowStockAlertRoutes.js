/** @format */

import express from "express";
import {
  getAllLowStockAlerts,
  postLowStockAlert,
  updateLowStockAlertStatus,
} from "../controllers/lowStockAlertsController.js"; // Adjust the path according to your project structure

const router = express.Router();

// GET /api/low-stock-alerts
// Fetch all low stock alerts (products below reorder level)
router.get("/", getAllLowStockAlerts);

// POST /api/low-stock-alerts
// Create a low stock alert for a product
router.post("/", postLowStockAlert);

// PATCH /api/low-stock-alerts/:id
// Update the status of a low stock alert (e.g., mark as resolved or reorder)
router.put("/:id", updateLowStockAlertStatus);

export default router;
