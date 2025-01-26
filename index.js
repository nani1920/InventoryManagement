/** @format */

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./lib/dbConnect.js";

import productsRoute from "./src/routes/productRoute.js";
import CategoryRoute from "./src/routes/categoryRoutes.js";
import SupplierRoute from "./src/routes/supplierRoutes.js";
import StockTransactionRoute from "./src/routes/stockTransactionRoutes.js";
import LowStockAlertRoute from "./src/routes/lowStockAlertRoutes.js";
import Product from "./src/models/productModel.js";
// import Category from "./src/models/categoryModel.js";
// import Supplier from "./src/models/suppliersModel.js";
connectDB();
const app = express();
app.use(express.json());

import cors from "cors";

// Enable CORS for all origins in development. For production, be specific
const corsOptions = {
  origin: "*", // Or specify 'http://localhost:3000' if you only want this to work in your localhost
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions)); // apply cors middleware

app.use("/products", productsRoute);
app.use("/categories", CategoryRoute);
app.use("/suppliers", SupplierRoute);
app.use("/transactions", StockTransactionRoute);
app.use("/low-stock-alerts", LowStockAlertRoute);

const categories = [
  {
    name: "Laptops",
    description:
      "Portable computers designed for mobile use with powerful hardware.",
  },
  {
    name: "Smartphones",
    description:
      "Handheld devices offering mobile computing, communication, and multimedia functions.",
  },
  {
    name: "Tablets",
    description:
      "Touchscreen devices that combine features of a smartphone and a laptop.",
  },
  {
    name: "Headphones",
    description:
      "Audio devices worn on or over the ears for listening to music or taking calls.",
  },
  {
    name: "Smart Watches",
    description:
      "Wrist-worn devices that offer smartphone-like functionality along with fitness tracking.",
  },
  {
    name: "TVs",
    description:
      "Large electronic displays for watching television shows and movies.",
  },
  {
    name: "Cameras",
    description: "Devices used to capture images or videos.",
  },
  {
    name: "Home Appliances",
    description:
      "Electric machines that assist with household tasks like cooking, cleaning, and food preservation.",
  },
  {
    name: "Gaming Consoles",
    description:
      "Electronic devices designed for playing video games, often connected to a TV or monitor.",
  },
  {
    name: "Accessories",
    description:
      "Complementary products such as phone cases, chargers, and laptop bags.",
  },
];
const suppliers = [
  {
    name: "TechWorld",
    contactPerson: "John Doe",
    contactEmail: "john.doe@techworld.com",
    contactPhone: "+1 234 567 890",
    address: "123 Tech Street, Silicon Valley, CA",
  },
  {
    name: "Gizmo Electronics",
    contactPerson: "Sarah Lee",
    contactEmail: "sarah.lee@gizmo.com",
    contactPhone: "+1 987 654 321",
    address: "456 Gizmo Lane, New York, NY",
  },
  {
    name: "Digital Gadgets",
    contactPerson: "Mike Johnson",
    contactEmail: "mike.johnson@digitalgadgets.com",
    contactPhone: "+1 555 123 456",
    address: "789 Digital Blvd, Austin, TX",
  },
  {
    name: "SmartTech Suppliers",
    contactPerson: "Emily Davis",
    contactEmail: "emily.davis@smarttech.com",
    contactPhone: "+1 333 444 555",
    address: "101 SmartTech Rd, San Francisco, CA",
  },
  {
    name: "ElectroHub",
    contactPerson: "Daniel King",
    contactEmail: "daniel.king@electrohub.com",
    contactPhone: "+1 212 555 6789",
    address: "202 ElectroHub Ave, Chicago, IL",
  },
  {
    name: "GadgetMasters",
    contactPerson: "Laura White",
    contactEmail: "laura.white@gadgetmasters.com",
    contactPhone: "+1 800 555 1234",
    address: "303 GadgetMasters St, Los Angeles, CA",
  },
  {
    name: "NextGen Electronics",
    contactPerson: "Chris Brown",
    contactEmail: "chris.brown@nextgen.com",
    contactPhone: "+1 415 789 0123",
    address: "404 NextGen Way, Seattle, WA",
  },
  {
    name: "Innovative Solutions",
    contactPerson: "Nancy Green",
    contactEmail: "nancy.green@innovativesolutions.com",
    contactPhone: "+1 202 555 9876",
    address: "505 Innovation Blvd, Boston, MA",
  },
  {
    name: "FutureTech Supplies",
    contactPerson: "Robert Smith",
    contactEmail: "robert.smith@futuretech.com",
    contactPhone: "+1 303 555 1111",
    address: "606 FutureTech Park, Denver, CO",
  },
  {
    name: "Prime Electronics",
    contactPerson: "Olivia Harris",
    contactEmail: "olivia.harris@primeelectronics.com",
    contactPhone: "+1 424 555 2222",
    address: "707 Prime Ave, Miami, FL",
  },
];

const newProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    price: 89.99,
    stockQuantity: 150,
    reorderLevel: 50,
    category: "6795c4e1a5db310474f7784d", // Laptops
    supplier: "6795c5a5fc442f56302a3c93", // TechWorld
  },
  {
    name: "Organic Green Tea",
    price: 5.99,
    stockQuantity: 200,
    reorderLevel: 30,
    category: "6795c4e1a5db310474f7784e", // Smartphones
    supplier: "6795c5a5fc442f56302a3c94", // Gizmo Electronics
  },
  {
    name: "Smartwatch Fitness Tracker",
    price: 120.0,
    stockQuantity: 80,
    reorderLevel: 20,
    category: "6795c4e1a5db310474f7784f", // Tablets
    supplier: "6795c5a5fc442f56302a3c95", // Digital Gadgets
  },
  {
    name: "Leather Wallet",
    price: 39.99,
    stockQuantity: 250,
    reorderLevel: 50,
    category: "6795c4e1a5db310474f77850", // Headphones
    supplier: "6795c5a5fc442f56302a3c96", // SmartTech Suppliers
  },
  {
    name: "Gaming Laptop",
    price: 1499.99,
    stockQuantity: 50,
    reorderLevel: 10,
    category: "6795c4e1a5db310474f77851", // Smart Watches
    supplier: "6795c5a5fc442f56302a3c97", // ElectroHub
  },
  {
    name: "Air Fryer",
    price: 79.99,
    stockQuantity: 100,
    reorderLevel: 25,
    category: "6795c4e1a5db310474f77852", // TVs
    supplier: "6795c5a5fc442f56302a3c98", // GadgetMasters
  },
  {
    name: "Cotton Bed Sheets Set",
    price: 35.5,
    stockQuantity: 180,
    reorderLevel: 40,
    category: "6795c4e1a5db310474f77853", // Cameras
    supplier: "6795c5a5fc442f56302a3c99", // NextGen Electronics
  },
  {
    name: "Portable Speaker",
    price: 49.99,
    stockQuantity: 300,
    reorderLevel: 100,
    category: "6795c4e1a5db310474f77854", // Home Appliances
    supplier: "6795c5a5fc442f56302a3c9a", // Innovative Solutions
  },
  {
    name: "Electric Toothbrush",
    price: 29.99,
    stockQuantity: 220,
    reorderLevel: 50,
    category: "6795c4e1a5db310474f77855", // Gaming Consoles
    supplier: "6795c5a5fc442f56302a3c9b", // FutureTech Supplies
  },
  {
    name: "Yoga Mat",
    price: 18.99,
    stockQuantity: 150,
    reorderLevel: 30,
    category: "6795c4e1a5db310474f77856", // Accessories
    supplier: "6795c5a5fc442f56302a3c9c", // Prime Electronics
  },
  {
    name: "Bluetooth Speaker",
    price: 45.99,
    stockQuantity: 150,
    reorderLevel: 30,
    category: "6795c4e1a5db310474f7784d", // Laptops
    supplier: "6795c5a5fc442f56302a3c93", // TechWorld
  },
  {
    name: "Stainless Steel Water Bottle",
    price: 19.99,
    stockQuantity: 200,
    reorderLevel: 50,
    category: "6795c4e1a5db310474f7784e", // Smartphones
    supplier: "6795c5a5fc442f56302a3c94", // Gizmo Electronics
  },
  {
    name: "Winter Jacket",
    price: 129.99,
    stockQuantity: 75,
    reorderLevel: 20,
    category: "6795c4e1a5db310474f7784f", // Tablets
    supplier: "6795c5a5fc442f56302a3c95", // Digital Gadgets
  },
  {
    name: "Smartphone",
    price: 899.99,
    stockQuantity: 100,
    reorderLevel: 15,
    category: "6795c4e1a5db310474f77850", // Headphones
    supplier: "6795c5a5fc442f56302a3c96", // SmartTech Suppliers
  },
  {
    name: "Running Shoes",
    price: 79.99,
    stockQuantity: 180,
    reorderLevel: 40,
    category: "6795c4e1a5db310474f77852", // TVs
    supplier: "6795c5a5fc442f56302a3c97", // ElectroHub
  },
  {
    name: "Electric Kettle",
    price: 25.99,
    stockQuantity: 250,
    reorderLevel: 75,
    category: "6795c4e1a5db310474f77853", // Cameras
    supplier: "6795c5a5fc442f56302a3c98", // GadgetMasters
  },
  {
    name: "Vitamins Supplement",
    price: 12.99,
    stockQuantity: 300,
    reorderLevel: 50,
    category: "6795c4e1a5db310474f77854", // Home Appliances
    supplier: "6795c5a5fc442f56302a3c99", // NextGen Electronics
  },
  {
    name: "Office Chair",
    price: 150.0,
    stockQuantity: 70,
    reorderLevel: 15,
    category: "6795c4e1a5db310474f77855", // Gaming Consoles
    supplier: "6795c5a5fc442f56302a3c9a", // Innovative Solutions
  },
  {
    name: "Bluetooth Mouse",
    price: 19.49,
    stockQuantity: 180,
    reorderLevel: 60,
    category: "6795c4e1a5db310474f77856", // Accessories
    supplier: "6795c5a5fc442f56302a3c9b", // FutureTech Supplies
  },
  {
    name: "Backpack",
    price: 45.0,
    stockQuantity: 250,
    reorderLevel: 50,
    category: "6795c4e1a5db310474f7784d", // Laptops
    supplier: "6795c5a5fc442f56302a3c9c", // Prime Electronics
  },
  {
    name: "Laptop Stand",
    price: 35.99,
    stockQuantity: 120,
    reorderLevel: 25,
    category: "6795c4e1a5db310474f7784e", // Smartphones
    supplier: "6795c5a5fc442f56302a3c93", // TechWorld
  },
  {
    name: "Coffee Maker",
    price: 69.99,
    stockQuantity: 150,
    reorderLevel: 30,
    category: "6795c4e1a5db310474f7784f", // Tablets
    supplier: "6795c5a5fc442f56302a3c94", // Gizmo Electronics
  },
  {
    name: "Fridge",
    price: 499.99,
    stockQuantity: 50,
    reorderLevel: 10,
    category: "6795c4e1a5db310474f77850", // Headphones
    supplier: "6795c5a5fc442f56302a3c95", // Digital Gadgets
  },
  {
    name: "Sunglasses",
    price: 29.99,
    stockQuantity: 300,
    reorderLevel: 100,
    category: "6795c4e1a5db310474f77851", // Smart Watches
    supplier: "6795c5a5fc442f56302a3c96", // SmartTech Suppliers
  },
  {
    name: "Cookware Set",
    price: 120.0,
    stockQuantity: 85,
    reorderLevel: 15,
    category: "6795c4e1a5db310474f77852", // TVs
    supplier: "6795c5a5fc442f56302a3c97", // ElectroHub
  },
  {
    name: "Wireless Charger",
    price: 39.99,
    stockQuantity: 200,
    reorderLevel: 50,
    category: "6795c4e1a5db310474f77853", // Cameras
    supplier: "6795c5a5fc442f56302a3c98", // GadgetMasters
  },
  {
    name: "Electric Fan",
    price: 45.0,
    stockQuantity: 90,
    reorderLevel: 20,
    category: "6795c4e1a5db310474f77854", // Home Appliances
    supplier: "6795c5a5fc442f56302a3c99", // NextGen Electronics
  },
  {
    name: "Bicycle",
    price: 299.99,
    stockQuantity: 60,
    reorderLevel: 10,
    category: "6795c4e1a5db310474f77855", // Gaming Consoles
    supplier: "6795c5a5fc442f56302a3c9a", // Innovative Solutions
  },
];

app.get("/addProducts", async (request, response) => {
  try {
    const categoriesSet = await Product.insertMany(newProducts);
    response.send("Successfully");
  } catch (e) {
    console.log(e.message);
  }
});

app.listen(process.env.PORT, () => {
  try {
    console.log("Server is listening at http://localhost:4000");
  } catch (e) {
    console.log(e.message);
  }
});
