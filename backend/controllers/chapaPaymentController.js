import orderModel from "../models/orderModel.js";
import foodModel from "../models/foodModel.js";
import axios from "axios";
import "dotenv/config";
const secret = process.env.CHAPA_SECRET_KEY;
console.log(secret);

const createPayment = async (req, res) => {
  const {
    amount,
    currency,
    email,
    first_name,
    last_name,
    tx_ref,
    callback_url,
  } = req.body;

  try {
    const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      {
        amount,
        currency,
        email,
        first_name,
        last_name,
        tx_ref,
        callback_url,
        return_url: callback_url,
      },
      {
        headers: {
          Authorization: `Bearer ${secret}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createPayment };
