// module.exports = (req, res) => {
//     res.send({ message: "Admin login route hit!" });
// };
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { adminModel } from "../../models/index.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { adminId: admin._id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            admin: {
                id: admin._id,
                email: admin.email,
                firstName: admin.firstName,
                lastName: admin.lastName
            }
        });
    } catch (error) {
        console.error("Admin login error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};