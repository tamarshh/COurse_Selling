import { Router } from "express";
import { authenticateUser } from "../middleware/auth.js";
import { validateCourseId, validatePurchase, validateRequest } from "../middleware/validators.js";

const courseRouter = Router();

import { purchaseCourse } from "../controllers/courses/purchaseCourse.js";
import { previewCourse } from "../controllers/courses/previewCourse.js";

// Public routes
courseRouter.get("/preview/:courseId", validateCourseId, validateRequest, previewCourse);

// Protected routes
courseRouter.use(authenticateUser);
courseRouter.post("/purchase", validatePurchase, validateRequest, purchaseCourse);

export { courseRouter };
