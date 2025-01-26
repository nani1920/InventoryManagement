/** @format */

import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const URI = process.env.URI;
// console.log(URI);

export const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("database is connected");
  } catch (e) {
    console.log(e.message);
  }
};
