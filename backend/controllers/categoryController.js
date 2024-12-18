import categoryModel from "../models/categoryModel.js";
import fs from "fs";

//add food item
const addCategory = async (req, res) => {
  let file_name = `${req.file.filename}`;
  const category = new categoryModel({
    name: req.body.name,
    image: file_name,
  });

  try {
    await category.save();
    res.json({ success: true, message: "category added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "false" });
  }
};

//Get specific menu item
const getMenuItem = async (req, res) => {
  try {
    const item = await categoryModel.findById(req.params.id);
    res.send(item);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update Category
const updateMenu = async (req, res) => {
  try {
    const updatedData = {
      name: req.body.name,
    };
    if (req.file) {
      updatedData.image = `/${req.file.filename}`;
    }
    const item = await categoryModel.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
      }
    );
    res.send({ success: true, data: item });
  } catch (err) {
    res.status(500).send(err);
  }
};

//all food list

const categoryList = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.json({ success: true, data: categories });
  } catch (error) {
    console.log(error);
    res.json({ success: false, mesage: error });
  }
};
const getCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

const removeCategory = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.body.id);
    fs.unlink(`uploads/${category.image}`, () => {});

    await categoryModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "category removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, mesage: error });
  }
};

export {
  addCategory,
  categoryList,
  removeCategory,
  getCategory,
  getMenuItem,
  updateMenu,
};
