/** @format */
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Supplier from "../models/suppliersModel.js";

export const postProduct = async (request, response) => {
  const {
    name,
    price,
    stockQuantity,
    reorderLevel,
    categoryName,
    supplierName,
  } = request.body;

  try {
    // Find the category by name
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return response
        .status(400)
        .json({ message: `Category ${categoryName} not found` });
    }

    // Find the supplier by name
    const supplier = await Supplier.findOne({ name: supplierName });
    if (!supplier) {
      return response
        .status(400)
        .json({ message: `Supplier ${supplierName} not found` });
    }

    // Create the product with references to category and supplier
    const newProduct = new Product({
      name,
      price,
      stockQuantity,
      reorderLevel,
      category: category._id, // Link to the found category
      supplier: supplier._id, // Link to the found supplier
    });

    const savedProduct = await newProduct.save();

    // Send success response
    response.status(201).json({
      message: "Product created successfully",
      createdProduct: savedProduct,
    });
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

// GET /api/products
// Fetch all products in the inventory.
export const getAllProducts = async (request, response) => {
  try {
    const products = await Product.find()
      .populate("category", "name") // Populating category name
      .populate("supplier", "name"); // Populating supplier name
    if (!products || products.length === 0) {
      return response.status(404).json({ message: "No products found" });
    }
    response.status(200).json(products);
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

// GET /api/products/:id
// Get details of a specific product by its ID.
export const getProductById = async (request, response) => {
  const { id } = request.params;

  try {
    const product = await Product.findById(id)
      .populate("category", "name")
      .populate("supplier", "name");
    if (!product) {
      return response.status(404).json({ message: "Product not found" });
    }
    response.status(200).json(product);
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

// PUT /api/products/:id
// Update an existing product's details (e.g., name, price, quantity).
export const updateProduct = async (request, response) => {
  const { id } = request.params;
  const {
    name,
    price,
    stockQuantity,
    reorderLevel,
    categoryName,
    supplierName,
  } = request.body;

  try {
    // Find the category by name
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return response
        .status(400)
        .json({ message: `Category ${categoryName} not found` });
    }

    // Find the supplier by name
    const supplier = await Supplier.findOne({ name: supplierName });
    if (!supplier) {
      return response
        .status(400)
        .json({ message: `Supplier ${supplierName} not found` });
    }

    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return response.status(404).json({ message: "Product not found" });
    }

    // Update product details
    product.name = name || product.name;
    product.price = price || product.price;
    product.stockQuantity = stockQuantity || product.stockQuantity;
    product.reorderLevel = reorderLevel || product.reorderLevel;
    product.category = category._id; // Link to the found category
    product.supplier = supplier._id; // Link to the found supplier

    const updatedProduct = await product.save();

    response.status(200).json({
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

// DELETE /api/products/:id
// Delete a product from the inventory.
export const deleteProduct = async (request, response) => {
  const { id } = request.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return response.status(404).json({ message: "Product not found" });
    }

    // Delete the product
    await product.remove();

    response.status(200).json({
      message: "Product deleted successfully",
      deletedProduct: product,
    });
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};
