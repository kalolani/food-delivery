import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import "dotenv/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const url = "http://localhost:4000";
const frontend_url = "http://localhost:5173";
const placeOrder = async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      metadata: {
        user_Id: req.body.userId,
        cart: JSON.stringify(req.body.items),
        total_amount: req.body.amount,
        address: JSON.stringify(req.body.address),
      },
    });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          // images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      customer: customer.id,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true`,
      cancel_url: `${frontend_url}/verify?success=false`,
    });
    res.json({ success: true, session_url: session.url });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error" });
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

const listOrders = async (req, res) => {
  try {
    const orderData = await orderModel.find({});
    res.json({ success: true, data: orderData });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error" });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "status updated" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, userOrders, verifyOrder, listOrders, updateStatus };
