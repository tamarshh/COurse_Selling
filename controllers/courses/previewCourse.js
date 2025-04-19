import { coursesModel } from "../../models/index.js";

export const previewCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await coursesModel.findById(courseId)
            .select('-creatorId')
            .populate('creatorId', 'firstName lastName');

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({
            message: "Course preview retrieved successfully",
            course: {
                id: course._id,
                title: course.title,
                description: course.description,
                price: course.price,
                imageUrl: course.imageUrl,
                creator: {
                    firstName: course.creatorId.firstName,
                    lastName: course.creatorId.lastName
                }
            }
        });
    } catch (error) {
        console.error("Preview course error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};