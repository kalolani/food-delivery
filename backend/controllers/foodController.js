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
    const foodItem = await foodModel.findById(foodId);

    if (!foodItem) {
      return res.status(404).send("Food item not found");
    }

    foodItem.ratings.push(rating);
    await foodItem.save();

    res.json({ message: "Rating submitted successfully" });
  } catch (error) {
    console.error("Error submitting rating:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getAverageRating = async (req, res) => {
  const { foodId } = req.params;

  try {
    const foodItem = await foodModel.findById(foodId);

    if (!foodItem) {
      return res.status(404).send("Food item not found");
    }

    const ratings = foodItem.ratings;
    const averageRating =
      ratings.length > 0
        ? ratings.reduce((a, b) => a + b, 0) / ratings.length
        : 0;

    res.json({ averageRating });
  } catch (error) {
    console.error("Error fetching average rating:", error);
    res.status(500).send("Internal Server Error");
  }
};

const listTopRatings = async (req, res) => {
  try {
    const foods = await foodModel.find();
    const averageRatings = foods.map((food) => {
      const sum = food.ratings.reduce((a, b) => a + b, 0);
      const avg = sum / food.ratings.length;
      return { name: food.name, rating: avg };
    });
    res.json(averageRatings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching average ratings" });
  }
};

export {
  addFood,
  foodList,
  removeFood,
  countFoodItem,
  rateFoodItem,
  getAverageRating,
  listTopRatings,
};
