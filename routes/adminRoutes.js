import { Router } from "express";
import { authenticateAdmin } from "../middleware/auth.js";

const adminRouter = Router();

import { signup } from "../controllers/admin/signup.js";
import { login } from "../controllers/admin/login.js";
import { createCourse } from "../controllers/admin/createCourses.js";
import { updateCourse } from "../controllers/admin/updateCourses.js";
import { getAllCourses } from "../controllers/admin/getAllCourses.js";

// Public routes
adminRouter.post("/signup", signup);
adminRouter.post("/login", login);

// Protected routes
adminRouter.use(authenticateAdmin);
adminRouter.post("/courses", createCourse);
adminRouter.put("/courses/:courseId", updateCourse);
adminRouter.get("/courses/bulk", getAllCourses);

export { adminRouter };
