import bcrypt from "bcrypt";
import { userModel } from "../../models/index.js";

export const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};