import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import "dotenv/config";

//config
const app = express();
const port = 4000;

//middleware

app.use(express.json());
app.use(cors());

//db connection
connectDB();

//api end point
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));

app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});

//mongodb+srv://kaleab:kalolani@cluster0.ofl3a1t.mongodb.net/?
