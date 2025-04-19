import jwt from "jsonwebtoken";
import { userModel } from "../models/index.js";

export const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        res.status(401).json({ message: "Invalid token" });
    }
};

export const authenticateAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await adminModel.findById(decoded.adminId);

        if (!admin) {
            return res.status(401).json({ message: "Admin not found" });
        }

        req.admin = decoded;
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        res.status(401).json({ message: "Invalid token" });
    }
}; 