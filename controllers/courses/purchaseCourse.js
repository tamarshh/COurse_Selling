import { coursesModel, purchaseModel } from "../../models/index.js";

export const purchaseCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.userId;

        // Check if course exists
        const course = await coursesModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Check if user already purchased the course
        const existingPurchase = await purchaseModel.findOne({
            userId,
            courseId
        });

        if (existingPurchase) {
            return res.status(409).json({ message: "Course already purchased" });
        }

        // Create new purchase
        const newPurchase = new purchaseModel({
            userId,
            courseId,
            status: 'completed'
        });

        await newPurchase.save();

        res.status(201).json({
            message: "Course purchased successfully",
            purchase: {
                id: newPurchase._id,
                courseId: newPurchase.courseId,
                purchaseDate: newPurchase.purchaseDate,
                status: newPurchase.status
            }
        });
    } catch (error) {
        console.error("Purchase course error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};