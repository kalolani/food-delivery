import express from "express";
import {
  addCategory,
  categoryList,
  getCategory,
  removeCategory,
} from "../controllers/categoryController.js";
import multer from "multer";
import { get } from "mongoose";

const categoryRouter = express.Router();

//image storage engine

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

categoryRouter.post("/add", upload.single("image"), addCategory);
categoryRouter.get("/list", categoryList);
categoryRouter.get("/list-category", getCategory);
categoryRouter.post("/remove", removeCategory);

export default categoryRouter;
