/** @format */

import Supplier from "../models/suppliersModel.js";
import mongoose from "mongoose";

export const postSupplier = async (request, response) => {
  const { name, contactPerson, contactEmail, contactPhone, address } =
    request.body;
  try {
    if (!name || name.trim() === "") {
      return response.status(400).json({ message: "Invalid - Name field" });
    }
    if (!contactPerson || contactPerson.trim() === "") {
      return response
        .status(400)
        .json({ message: "Invalid - Contact Person field" });
    }
    if (!contactEmail || contactEmail.trim() === "") {
      return response
        .status(400)
        .json({ message: "Invalid - Contact Email field" });
    }
    if (!contactPhone || contactPhone.trim() === "") {
      return response
        .status(400)
        .json({ message: "Invalid - Contact Phone field" });
    }
    if (!address || address.trim() === "") {
      return response.status(400).json({ message: "Invalid - Address field" });
    }

    const newSupplier = new Supplier({
      name,
      contactPerson,
      contactEmail,
      contactPhone,
      address,
    });

    const savedSupplier = await newSupplier.save();

    response.status(201).json({
      message: "Successfully created the Supplier",
      createdSupplier: savedSupplier,
    });
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

export const getAllSuppliers = async (request, response) => {
  try {
    const suppliers = await Supplier.find();
    if (!suppliers) {
      return response.status(404).json({ message: "No-suppliers Found" });
    }
    response.status(200).json(suppliers);
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

export const getSupplierById = async (request, response) => {
  const { supplierId } = request.params;

  if (!mongoose.Types.ObjectId.isValid(supplierId)) {
    return response.status(400).json({ message: "Invalid Supplier ID format" });
  }

  try {
    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return response.status(404).json({ message: "Supplier not found" });
    }
    response.status(200).json(supplier);
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

export const updateSupplier = async (request, response) => {
  const { name, contactPerson, contactEmail, contactPhone, address } =
    request.body;
  const { supplierId } = request.params;

  if (!mongoose.Types.ObjectId.isValid(supplierId)) {
    return response.status(400).json({ message: "Invalid Supplier ID format" });
  }

  try {
    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return response.status(404).json({ message: "Supplier not found" });
    }

    supplier.name = name || supplier.name;
    supplier.contactPerson = contactPerson || supplier.contactPerson;
    supplier.contactEmail = contactEmail || supplier.contactEmail;
    supplier.contactPhone = contactPhone || supplier.contactPhone;
    supplier.address = address || supplier.address;

    await supplier.save();

    response.status(200).json({
      message: "Successfully updated the Supplier",
      updatedSupplier: supplier,
    });
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};

export const deleteSupplier = async (request, response) => {
  const { supplierId } = request.params;

  if (!mongoose.Types.ObjectId.isValid(supplierId)) {
    return response.status(400).json({ message: "Invalid Supplier ID format" });
  }

  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(supplierId);
    if (!deletedSupplier) {
      return response.status(404).json({ message: "Supplier not found" });
    }
    response.status(200).json({
      message: "Supplier deleted successfully",
      deletedSupplier,
    });
  } catch (e) {
    response.status(500).json({ message: e.message });
  }
};
