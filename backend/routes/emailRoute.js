// backend/routes/emailRoutes.js
import express from "express";
import {
  receiveEmail,
  fetchEmails,
  message,
} from "../controllers/emailController.js";

const EmailRouter = express.Router();

EmailRouter.post("/receive-email", receiveEmail);
EmailRouter.get("/fetch-email", fetchEmails);
EmailRouter.get("/message/:id", message);
export default EmailRouter;
