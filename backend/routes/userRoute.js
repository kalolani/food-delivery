import express from "express";
import {
  getSingleUser,
  getUserCount,
  loginUser,
  registerUser,
  usersList,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/list", usersList);
userRouter.get("/count", getUserCount);
userRouter.get("/edit", getSingleUser);

export default userRouter;
