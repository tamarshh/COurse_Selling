import { purchaseModel } from "../../models/index.js";

export const getPurchases = async (req, res) => {
    try {
        const userId = req.user.userId; // Assuming user ID is available from auth middleware

        const purchases = await purchaseModel.find({ userId })
            .populate('courseId')
            .select('-userId');

        res.status(200).json({
            message: "Purchases retrieved successfully",
            purchases
        });
    } catch (error) {
        console.error("Get purchases error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
