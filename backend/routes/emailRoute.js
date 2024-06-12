// backend/routes/emailRoutes.js
import express from "express";
import {
  receiveEmail,
  fetchEmails,
  message,
  getEmailCount,
} from "../controllers/emailController.js";

const EmailRouter = express.Router();

EmailRouter.post("/receive-email", receiveEmail);
EmailRouter.get("/fetch-email", fetchEmails);
EmailRouter.get("/message/:id", message);
EmailRouter.get("/count", getEmailCount);
export default EmailRouter;
