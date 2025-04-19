import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const userModel = mongoose.model("User", userSchema);

export { userModel };
