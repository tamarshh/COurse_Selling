import { coursesModel } from "../../models/index.js";

export const createCourse = async (req, res) => {
    try {
        const { title, description, price, imageUrl } = req.body;

        if (!title || !description || !price) {
            return res.status(400).json({ message: "Title, description, and price are required" });
        }

        const newCourse = new coursesModel({
            title,
            description,
            price,
            imageUrl,
            creatorId: req.admin.adminId
        });

        await newCourse.save();

        res.status(201).json({
            message: "Course created successfully",
            course: {
                id: newCourse._id,
                title: newCourse.title,
                description: newCourse.description,
                price: newCourse.price,
                imageUrl: newCourse.imageUrl
            }
        });
    } catch (error) {
        console.error("Create course error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
