import axios from "axios";
import crypto from "crypto";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
app.use(express.json());

const createPayment = async (req, res) => {
  const {
    amount,
    currency,
    email,
    first_name,
    last_name,
    phone_number,
    tx_ref,
    callback_url,
    items,
    address,
  } = req.body;
  console.log(phone_number);
  const key = process.env.CHAPA_SECRET_KEY;
  // Create metadata object
  // console.log(address);

  try {
    const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      {
        key,
        amount,
        currency,
        email,
        first_name,
        last_name,
        phone_number,
        tx_ref,
        callback_url: `${callback_url}/verify-payment`,
        return_url: `${callback_url}/verify?success=true`,
        customization: {
          title: "food-del",
          description: "food-del-app",

          // userId: req.body.userId,
        },
        meta: {
          userId: req.body.userId,
          items,
          address,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleWebhook = async (req, res) => {
  console.log("Webhook received:", JSON.stringify(req.body, null, 2));

  const signature =
    req.headers["x-chapa-signature"] || req.headers["Chapa-Signature"];
  const payload = JSON.stringify(req.body);

  console.log("Received signature:", signature);
  console.log("Payload:", payload);
  console.log("CHAPA_SECRET_KEY:", process.env.CHAPA_SECRET_KEY);

  // Ensure that CHAPA_SECRET_KEY is not undefined or empty
  if (!process.env.CHAPA_SECRET_KEY) {
    console.error("CHAPA_SECRET_KEY is not set");
    return res.status(500).send("Server error: CHAPA_SECRET_KEY not set");
  }

  // Calculate the HMAC hash
  const hash = crypto
    .createHmac("sha256", process.env.CHAPA_SECRET_KEY)
    .update(payload)
    .digest("hex");

  console.log("Calculated hash:", hash);

  // Compare the calculated hash with the received signature
  if (signature === hash) {
    console.log("Signatures match, processing the webhook event");

    const transaction = req.body;

    if (transaction.status === "success") {
      try {
        const orderId = Date.now();
        // const { userId, items, address } = transaction.meta;
        let meta;
        if (typeof transaction.meta === "string") {
          try {
            meta = JSON.parse(transaction.meta);
          } catch (error) {
            console.error("Error parsing meta field:", error);
            return res.status(400).send("Invalid meta field");
          }
        } else {
          meta = transaction.meta || {};
        }

        const { userId, items, address } = meta;

        const newOrder = new orderModel({
          orderId,
          userId: userId || "9238923892", // Replace with appropriate handling
          items: items || [], // Replace with appropriate handling
          address: address || "dilla", // Replace with appropriate handling

          amount: transaction.amount,

          status: "Food Processing",
          payment: "Paid",
          rating: "",
        });

        const createdOrder = await newOrder.save();
        await userModel.findByIdAndUpdate(userId, {
          cartData: {},
        });
        console.log("Order created successfully:", createdOrder);
        res.status(200).send("Webhook received and processed");
      } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).send("Error creating order");
      }
    } else {
      console.log("Payment status:", transaction.status);
      res.status(400).send("Payment not successful");
    }
  } else {
    console.error("Invalid signature");
    res.status(401).send("Invalid signature");
  }
};

const verifyOrder = async (req, res) => {
  const { success, orderId } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payement: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (err) {
    console.log(err);
    req.json({ success: false, message: "Error" });
  }
};

export { createPayment, handleWebhook, verifyOrder };
