import express from "express";
import {
  addFood,
  countFoodItem,
  foodList,
  getAverageRating,
  getFoodItem,
  listTopRatings,
  rateFoodItem,
  removeFood,
  updateFood,
} from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

//image storage engine

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/edit/:id", getFoodItem);
foodRouter.put("/update/:id", upload.single("image"), updateFood);
foodRouter.get("/list", foodList);
foodRouter.post("/remove", removeFood);
foodRouter.get("/countFood", countFoodItem);
foodRouter.post("/rating", rateFoodItem);
foodRouter.get("/average-rating/:foodId", getAverageRating);
foodRouter.get("/top-rated", listTopRatings);
export default foodRouter;
