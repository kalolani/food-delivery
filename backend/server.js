import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config";
import adminRouter from "./routes/adminRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import imageRouter from "./routes/imageRoute.js";
import emailRouter from "./routes/emailRoute.js";
import paymentRouter from "./routes/chapaRoute.js";

//config
const app = express();
const port = process.env.PORT || 4000;

//middleware

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//db connection
connectDB();

//api end point
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/category", categoryRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/image", imageRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);
app.use("/api/email", emailRouter);
app.use("/api/payment", paymentRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});

//mongodb+srv://kaleab:kalolani@cluster0.ofl3a1t.mongodb.net/?

