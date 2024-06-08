import express from "express";
import { createPayment } from "../controllers/chapaPaymentController.js";
import authMiddleware from "../middleware/auth.js";
const paymentRouter = express.Router();
paymentRouter.post("/create-payment", authMiddleware, createPayment);

export default paymentRouter;
