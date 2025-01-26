/** @format */

import express from "express";
import {
  postSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} from "../controllers/supplierController.js"; // Adjust the path to your controllers as needed

const router = express.Router();

// POST /api/suppliers
// Add a new supplier
router.post("/", postSupplier);

// GET /api/suppliers
// Fetch all suppliers
router.get("/", getAllSuppliers);

// GET /api/suppliers/:supplierId
// Get details of a specific supplier
router.get("/:supplierId", getSupplierById);

// PUT /api/suppliers/:supplierId
// Update supplier details
router.put("/:supplierId", updateSupplier);

// DELETE /api/suppliers/:supplierId
// Delete a specific supplier
router.delete("/:supplierId", deleteSupplier);

export default router;
