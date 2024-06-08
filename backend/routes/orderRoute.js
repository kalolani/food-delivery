import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  placeOrder,
  userOrders,
  verifyOrder,
  listOrders,
  updateStatus,
  getWeeklyRevenue,
  popularCategory,
  getTotalAmount,
  getTotalCategory,
  getTotalOrder,
  deliveredOrder,
  PendingOrder,
  recentOrders,
} from "../controllers/orderController.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

import Stripe from "stripe";
import "dotenv/config";
import crypto from "crypto";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorder", authMiddleware, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);
orderRouter.get("/weeklyRevenue", getWeeklyRevenue);
orderRouter.get("/popularCategory", popularCategory);
orderRouter.get("/totalAmount", getTotalAmount);
orderRouter.get("/totalCategory", getTotalCategory);
orderRouter.get("/totalOrder", getTotalOrder);
orderRouter.get("/delivered", deliveredOrder);
orderRouter.get("/pending", PendingOrder);
orderRouter.get("/recent", recentOrders);

let endpointSecret;
// endpointSecret = process.env.WEBHOOK_SECRET;
orderRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    let eventType;
    let data;

    if (endpointSecret) {
      let event;
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the event
    if (eventType === "checkout.session.completed") {
      stripe.customers.retrieve(data.customer).then((customer) => {
        console.log("customer details", customer);
        console.log("data", data);
        createOrder(customer, data, res);
      });
    }
    // Return a 200 res to acknowledge receipt of the event
    res.send().end();
  }
);

const createOrder = async (customer, intent, res) => {
  try {
    const orderId = Date.now(); // Replace with your actual logic to get/generate the orderId
    console.log(orderId);
    const newOrder = new orderModel({
      intent: intent.id,
      orderId: orderId,
      amount: customer.metadata.total_amount,
      created: intent.created,
      payment_method_types: intent.payment_method_types,
      status: "preparing",
      payment: intent.payment_status,
      customer: intent.customer_details,
      shipping_details: intent.shipping_details,
      userId: customer.metadata.user_Id,
      items: JSON.parse(customer.metadata.cart),
      address: JSON.parse(customer.metadata.address), // Ensure address is included here
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(customer.metadata.user_Id, {
      cartData: {},
    });

    // Save order ID in Stripe metadata instead of full cart details

    return res.status(200).send({ message: "Order created successfully" });
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      return res
        .status(500)
        .send({ message: "Error creating order", error: error.message });
    }
  }
};

//chapa payment integration
orderRouter.post("/webhook/chapa", (req, res) => {
  const event = req.body;
  const signature = req.headers["chapa-signature"];
  const secret = "CHASECK_TEST-8DdIMMbf7yjEcsbAaaBoZbWjqRCgoM3x"; // Get this from your Chapa account

  const hash = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(event))
    .digest("hex");

  if (hash !== signature) {
    return res.status(400).send("Invalid signature");
  }
  // Handle the event
  switch (event.event) {
    case "payment.success":
      // Handle successful payment
      console.log("Payment successful:", event.data);
      // Perform actions like updating the database, sending confirmation emails, etc.
      break;
    case "payment.failed":
      // Handle failed payment
      console.log("Payment failed:", event.data);
      break;
    // Handle other events
    default:
      console.log(`Unhandled event type: ${event.event}`);
  }

  // Respond to Chapa to acknowledge receipt of the event
  res.status(200).send("Event received");
});

export default orderRouter;
