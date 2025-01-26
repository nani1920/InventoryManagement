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
// import Category from "./src/models/categoryModel.js";
// import Supplier from "./src/models/suppliersModel.js";
connectDB();
const app = express();
app.use(express.json());

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

// app.get("/suppliers", async (request, response) => {
//   try {
//     const categoriesSet = await Supplier.insertMany(suppliers);
//     response.send("Successfully");
//   } catch (e) {
//     console.log(e.message);
//   }
// });

app.listen(process.env.PORT, () => {
  try {
    console.log("Server is listening at http://localhost:4000");
  } catch (e) {
    console.log(e.message);
  }
});
