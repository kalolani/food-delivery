import express from "express";
import {
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

export default userRouter;
