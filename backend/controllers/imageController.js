import adminModel from "../models/adminModel.js";
import userModel from "../models/userModel.js";
import fs from "fs";

const addToImage = async (req, res) => {
  let file_name = `${req.file.filename}`;
  try {
    let userData = await userModel.findById(req.body.userId);

    let image = await userData.image;
    image = file_name;

    await userModel.findByIdAndUpdate(req.body.userId, { image: image });
    res.json({ success: true, message: "Image added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const getImage = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);

    res.json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, mesage: error });
  }
};

const addAdminImage = async (req, res) => {
  let file_name = `${req.file.filename}`;
  try {
    let adminData = await adminModel.findById(req.body.userId);
    console.log(req.body.userId);

    let image = await adminData.image;
    image = file_name;

    await adminModel.findByIdAndUpdate(req.body.userId, { image: image });
    res.json({ success: true, message: "Image added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const getAdminImage = async (req, res) => {
  try {
    const admin = await adminModel.findById(req.body.userId);

    res.json({ success: true, data: admin });
  } catch (error) {
    console.log(error);
    res.json({ success: false, mesage: error });
  }
};

export { addToImage, getImage, getAdminImage, addAdminImage };
