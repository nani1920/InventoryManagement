/** @format */

import mongoose, { modelNames } from "mongoose";
import Category from "../models/categoryModel.js";
import Supplier from "../models/suppliersModel.js";
import Product from "../models/productModel.js";

// export const postProduct = async (request, response) => {
//   const { name, price, stockQuantity, reorderLevel, category, supplier } =
//     request.body;

//   try {
//     if (name.trim() === "" || !name) {
//       return response.status(400).json({ message: "Invalid-name field" });
//     }

//     if (!price || isNaN(price)) {
//       return response.status(400).json({ message: "Invalid-price field" });
//     }

//     if (stockQuantity == null || stockQuantity === "" || isNaN(stockQuantity)) {
//       return response
//         .status(400)
//         .json({ message: "Invalid-stockQuantity field" });
//     }

//     if (reorderLevel == null || reorderLevel === "" || isNaN(reorderLevel)) {
//       return response
//         .status(400)
//         .json({ message: "Invalid-reorderLevel field" });
//     }

//     if (category.trim() === "" || !category) {
//       return response.status(400).json({ message: "Invalid-category field" });
//     }

//     if (supplier.trim() === "" || !supplier) {
//       return response.status(400).json({ message: "Invalid-supplier field" });
//     }

//     const newProduct = new Product({
//       name,
//       price,
//       stockQuantity,
//       reorderLevel,
//       category,
//       supplier,
//     });

//     const savedProduct = await newProduct.save();

//     response.status(201).json({
//       message: "Product created successfully",
//       createdProduct: savedProduct,
//     });
//   } catch (e) {
//     response.status(500).json({ message: e.message });
//   }
// };

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
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return response
        .status(400)
        .json({ message: `Category ${categoryName} not found` });
    }

    // Find or create the Supplier
    const supplier = await Supplier.findOne({ name: supplierName });
    if (!supplier) {
      return response
        .status(400)
        .json({ message: `Supplier ${supplierName} not found` });
    }

    // Create a new product and link category & supplier
    const newProduct = new Product({
      name,
      price,
      stockQuantity,
      reorderLevel,
      category: category._id, // Use the ObjectId of the found category
      supplier: supplier._id, // Use the ObjectId of the found supplier
    });

    const savedProduct = await newProduct.save();

    // Return success response
    response.status(201).json({
      message: "Product created successfully",
      createdProduct: savedProduct,
    });
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

export const getAllProducts = async (request, response) => {
  try {
    const blogs = await Blog.find().populate(
      "assignedEditorId",
      "username role"
    );
    if (!blogs) {
      return response.status(404).json({ message: "No Blogs Found" });
    }
    response.status(200).json({ blogs });
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

export const getProduct = async (request, response) => {
  const { blogId } = request.params;
  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return response.status(400).json({ message: "Invalid Blog ID format" });
  }
  try {
    const blogData = await Blog.findOne({ _id: blogId }).populate(
      "assignedEditorId",
      "username role"
    );

    if (!blogData) {
      return response.status(404).json({ message: "Blog not found" });
    }
    response.status(200).json(blogData);
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

export const updateProduct = async (request, response) => {
  const { title, content } = request.body;
  const { blogId } = request.params;
  //Used to check valid format
  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return response.status(400).json({ message: "Invalid Blog ID format" });
  }
  try {
    if (title.trim() === "" || !title) {
      return response.status(400).json({ message: "Invalid-title field" });
    }
    if (content.trim() === "" || !content) {
      return response.status(400).json({ message: "Invalid-content field" });
    }
    const user = request.user;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return response.status(404).json({ message: "Blog not found" });
    }

    //check blog is particularly assigned to an editor
    if (user.role !== "admin" && !blog.assignedEditorId) {
      return response.status(403).json({
        message: "Blog has not been assigned to an editor yet",
      });
    }

    // check blog is assigned to requested editor
    if (
      user.role !== "admin" &&
      blog.assignedEditorId.toString() !== user._id.toString()
    ) {
      return response.status(403).json({
        message:
          "Access Denied - You can only edit blogs which are assigned to you",
      });
    }
    blog.title = title;
    blog.content = content;
    await blog.save();
    response
      .status(200)
      .json({ message: "Blog Updated Successfully", updatedBlog: blog });
  } catch (e) {
    return response.status(500).json({ message: e.message });
    console.log(e);
  }
};

export const deleteProduct = async (request, response) => {
  const { blogId } = request.params;
  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return response.status(400).json({ message: "Invalid blog ID format" });
  }
  try {
    const deletedBlog = await Blog.findByIdAndDelete({ _id: blogId });
    if (!deletedBlog) {
      return response.status(404).json({ message: "Blog not found" });
    }
    response
      .status(200)
      .json({ message: "Blog deleted Successfully", deletedBlog });
  } catch (e) {
    return response.status(500).json({ message: e.message });
  }
};
