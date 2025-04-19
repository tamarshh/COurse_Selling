import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { adminModel } from "../../models/index.js";

export const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new adminModel({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    await newAdmin.save();

    const token = jwt.sign(
      { adminId: newAdmin._id, email: newAdmin.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: "Admin registered successfully",
      token,
      admin: {
        id: newAdmin._id,
        email: newAdmin.email,
        firstName: newAdmin.firstName,
        lastName: newAdmin.lastName
      }
    });
  } catch (error) {
    console.error("Admin signup error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};