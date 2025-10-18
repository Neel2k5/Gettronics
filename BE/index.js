import express from "express";
import { connectMongoDB } from "./lib/DBConnector.js";
import dotenv from "dotenv";
import UserRouter from "./Routes/UserRouter.js";
import cookieParser from "cookie-parser";
import { verifyUserAuth } from "./Middlewares/AuthMiddleware.js";
import ProductRouter from "./Routes/ProductRouter.js";
import CartRouter from "./Routes/CartRouter.js";
import cors from "cors";
dotenv.config({ quiet: true });
const app = express();
//Generel middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);
//DB connect
if (!process.env.MONGO_URI) {
  console.error(`Error loading mongo uri from .env\nStopping server`);
  process.exit(1);
}
connectMongoDB(process.env.MONGO_URI);

app.use("/user", UserRouter);
app.use("/product", ProductRouter);
app.use("/cart", verifyUserAuth, CartRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server is sucessfully running on port : ${process.env.SERVER_PORT}`
  );
});
