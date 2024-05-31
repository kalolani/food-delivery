import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://kaleab:kalolani@cluster0.ofl3a1t.mongodb.net/food-delivery"
    )
    .then(() => console.log("DB Connected"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
};
