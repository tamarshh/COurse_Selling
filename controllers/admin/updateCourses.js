import { coursesModel } from "../../models/index.js";

export const updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, description, price, imageUrl } = req.body;

        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" });
        }

        const course = await coursesModel.findOne({
            _id: courseId,
            creatorId: req.admin.adminId
        });

        if (!course) {
            return res.status(404).json({ message: "Course not found or unauthorized" });
        }

        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (price) updateData.price = price;
        if (imageUrl) updateData.imageUrl = imageUrl;
        updateData.updatedAt = new Date();

        const updatedCourse = await coursesModel.findByIdAndUpdate(
            courseId,
            updateData,
            { new: true }
        );

        res.status(200).json({
            message: "Course updated successfully",
            course: {
                id: updatedCourse._id,
                title: updatedCourse.title,
                description: updatedCourse.description,
                price: updatedCourse.price,
                imageUrl: updatedCourse.imageUrl
            }
        });
    } catch (error) {
        console.error("Update course error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
