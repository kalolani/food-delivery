import foodModel from "../models/foodModel.js";
import fs from "fs";

//add food item
const addFood = async (req, res) => {
  let file_name = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: file_name,
  });

  try {
    await food.save();
    res.json({ success: true, message: "food added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "false" });
  }
};

//all food list

const foodList = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, mesage: error });
  }
};

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "food removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, mesage: error });
  }
};

const countFoodItem = async (req, res) => {
  try {
    const foodItemCount = await foodModel.countDocuments();

    res.json({ foodItemCount });
  } catch (error) {
    console.error("Error fetching food item count:", error);
    res.status(500).send("Internal Server Error");
  }
};
const rateFoodItem = async (req, res) => {
  const { foodId, rating } = req.body;

  try {
    const order = await foodModel.findByIdAndUpdate(foodId, {
      rating: rating,
    });

    if (!order) {
      return res.status(404).send("Order not found");
    }

    res.json({ message: "Rating submitted successfully" });
  } catch (error) {
    console.error("Error submitting rating:", error);
    res.status(500).send("Internal Server Error");
  }
};

export { addFood, foodList, removeFood, countFoodItem, rateFoodItem };
