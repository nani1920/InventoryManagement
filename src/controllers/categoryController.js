/** @format */
import mongoose from "mongoose";
import Category from "../models/categoryModel.js";

export const postCategories = async (request, response) => {
  const { name, description } = request.body;
  try {
    if (!name || name.trim() === "") {
      return response.status(400).json({ message: "Invalid - name field" });
    }
    if (!description || description.trim() === "") {
      return response
        .status(400)
        .json({ message: "Invalid - description field" });
    }
    const newCategory = new Category({
      name,
      description,
    });
    const savedCategory = await newCategory.save();
    response.status(201).json({
      message: "Successfully created the Category",
      createdCategory: savedCategory,
    });
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

export const getCategory = async (request, response) => {
  try {
    const categoriesList = await Category.find();
    response.status(200).json(categoriesList);
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

export const getCategoryById = async (request, response) => {
  const { categoryId } = request.params;
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return response.status(400).json({ message: "Invalid Category ID format" });
  }
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return response.status(404).json({ message: "Category Not found" });
    }
    response.status(200).json(category);
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

export const updateCategory = async (request, response) => {
  const { name, description } = request.body;
  const { categoryId } = request.params;
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return response.status(400).json({ message: "Invalid Category ID format" });
  }
  try {
    if (!name || name.trim() === "") {
      return response.status(400).json({ message: "Invalid - name field" });
    }
    if (!description || description.trim() === "") {
      return response
        .status(400)
        .json({ message: "Invalid - description field" });
    }
    const category = await Category.findById(categoryId);
    if (!category) {
      return response.status(404).json({ message: "Category not found" });
    }
    category.name = name;
    category.description = description;
    await category.save();
    response.status(200).json({
      message: "Successfully updated the Category",
      updatedCategory: category,
    });
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

export const deleteCategory = async (request, response) => {
  const { categoryId } = request.params;
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return response.status(400).json({ message: "Invalid Category ID format" });
  }
  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return response.status(404).json({ message: "Category not found" });
    }
    response
      .status(200)
      .json({ message: "category deleted successfully", deletedCategory });
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};
