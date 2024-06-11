import express from "express";
import {
  createPayment,
  handleWebhook,
} from "../controllers/chapaPaymentController.js";
import authMiddleware from "../middleware/auth.js";
import dotenv from "dotenv";
dotenv.config();
const paymentRouter = express.Router();
paymentRouter.post("/create-payment", authMiddleware, createPayment);
paymentRouter.post("/webhook/chapa", handleWebhook);

export default paymentRouter;
