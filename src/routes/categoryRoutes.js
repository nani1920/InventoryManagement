/** @format */

import express from "express";
import {
  postCategories,
  getCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js"; // Adjust the path according to your project structure

const router = express.Router();

// POST /categories
// Create a new category
router.post("/", postCategories);

// GET /categories
// Fetch all categories
router.get("/", getCategory);

// GET /categories/:categoryId
// Fetch details of a specific category by its ID
router.get("/:categoryId", getCategoryById);

// PUT /categories/:categoryId
// Update a category's details
router.put("/:categoryId", updateCategory);

// DELETE /categories/:categoryId
// Delete a category
router.delete("/:categoryId", deleteCategory);

export default router;
