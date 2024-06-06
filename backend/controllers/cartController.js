import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Item Removed From Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const getFromCart = async (req, res) => {
  try {
    const userId = req.body.userId;

    // Fetch user data
    const userData = await userModel.findById(userId).exec();
    if (!userData) {
      // console.log("User not found in database for ID:", userId);
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Access cart data
    const cartData = userData.cartData;
    if (!cartData) {
      // console.log("Cart data is empty for user ID:", userId);
      return res
        .status(404)
        .json({ success: false, message: "Cart data is empty" });
    }

    // console.log("Cart Data:", cartData); // Log the cart data

    res.json({ success: true, cartData });
  } catch (error) {
    console.log("Error in getFromCart:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving cart data" });
  }
};

export { addToCart, removeFromCart, getFromCart };
