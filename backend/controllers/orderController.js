import orderModel from "../models/orderModel.js";
import foodModel from "../models/foodModel.js";
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

const getWeeklyRevenue = async (req, res) => {
  try {
    const orders = await orderModel.aggregate([
      {
        $group: {
          _id: { $week: "$date" },
          totalRevenue: { $sum: "$amount" },
        },
      },
      {
        $project: {
          week: "$_id",
          revenue: "$totalRevenue",
          _id: 0,
        },
      },
      {
        $sort: { week: 1 },
      },
    ]);

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const popularCategory = async (req, res) => {
  try {
    const orders = await orderModel.aggregate([
      { $unwind: "$items" }, // Deconstruct the items array
      { $group: { _id: "$items.category", total: { $sum: 1 } } },
      { $project: { _id: 0, name: "$_id", value: "$total" } },
    ]);

    res.json(orders);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const getTotalAmount = async (req, res) => {
  try {
    console.log("Starting aggregation pipeline to get total amount sold");
    const pipeline = [
      {
        $group: {
          _id: null,
          totalAmountSold: { $sum: "$amount" },
        },
      },
    ];

    const result = await orderModel.aggregate(pipeline).exec();
    console.log("Aggregation result:", result);

    if (result.length > 0) {
      res.json({ totalAmountSold: result[0].totalAmountSold });
    } else {
      res.json({ totalAmountSold: 0 });
    }
  } catch (error) {
    console.error("Error fetching total amount sold:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getTotalCategory = async (req, res) => {
  try {
    const pipeline = [
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $project: { _id: 0, category: "$_id", count: 1 } },
    ];

    const result = await foodModel.aggregate(pipeline).exec();

    if (result.length > 0) {
      res.json(result.length);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error("Error fetching category types:", error);
    res.status(500).send("Internal Server Error");
  }
};
const getTotalOrder = async (req, res) => {
  try {
    const orderCount = await orderModel.countDocuments();

    res.json({ orderCount });
  } catch (error) {
    console.error("Error fetching order count:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deliveredOrder = async (req, res) => {
  try {
    const pipeline = [
      { $match: { status: "Delivered" } }, // Match documents with status "delivered"
      { $count: "deliveredOrderCount" }, // Count the matched documents
    ];

    const result = await orderModel.aggregate(pipeline).exec();

    if (result.length > 0) {
      res.json({ deliveredOrderCount: result[0].deliveredOrderCount });
    } else {
      res.json({ deliveredOrderCount: 0 });
    }
  } catch (error) {
    console.error("Error fetching delivered order count:", error);
    res.status(500).send("Internal Server Error");
  }
};
const PendingOrder = async (req, res) => {
  try {
    const pipeline = [
      { $match: { status: "Out for delivery" } }, // Match documents with status "delivered"
      { $count: "deliveredOrderCount" }, // Count the matched documents
    ];

    const result = await orderModel.aggregate(pipeline).exec();

    if (result.length > 0) {
      res.json({ deliveredOrderCount: result[0].deliveredOrderCount });
    } else {
      res.json({ deliveredOrderCount: 0 });
    }
  } catch (error) {
    console.error("Error fetching delivered order count:", error);
    res.status(500).send("Internal Server Error");
  }
};

export {
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
};
