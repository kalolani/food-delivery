import express from "express";
import authMiddleware from "../middleware/auth.js";

import { addToImage, getImage } from "../controllers/imageController.js";
import multer from "multer";

const imageRouter = express.Router();
//image storage engine

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

imageRouter.post("/add", upload.single("image"), authMiddleware, addToImage);
imageRouter.post("/list", authMiddleware, getImage);

export default imageRouter;
