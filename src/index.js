import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import allPaths from "./api/routes/allPaths.js";

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", allPaths);

// Error Handler Middleware
app.use((obj, req, res, next)=> {
  const statusCode = obj.status || 500;
  const message = obj.message || "Bad Gateway!"
  return res.status(statusCode).json({
    success: [200, 201, 204].some(a => a === obj.status) ? true : false,
    status: statusCode,
    message: message,
    data: obj.data
  })
})

// DB Connection 
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected To Database !");
  } catch (error) {
    throw error;
  }
};
const port = process.env.PORT;
app.listen(port, () => {
  connectMongoDB();
  console.log(`server running on port ${port}`);
});
