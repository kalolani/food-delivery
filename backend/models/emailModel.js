import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  receivedAt: { type: Date, default: Date.now },
});

const emailModel =
  mongoose.models.email || mongoose.model("email", emailSchema);

export default emailModel;
