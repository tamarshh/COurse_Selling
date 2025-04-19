import { coursesModel } from "../../models/index.js";

export const getAllCourses = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const courses = await coursesModel.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select('-creatorId');

        const totalCourses = await coursesModel.countDocuments();

        res.status(200).json({
            message: "Courses retrieved successfully",
            courses,
            pagination: {
                total: totalCourses,
                page,
                limit,
                totalPages: Math.ceil(totalCourses / limit)
            }
        });
    } catch (error) {
        console.error("Get all courses error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
