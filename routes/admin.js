const { Router } = require("express");
const adminRouter = Router();

const {signup}= require("../controllers/admin/signup");
const {login} = require("../controllers/admin/login");
const {createCourse} = require("../controllers/admin/createCourses");
const {updateCourse} = require("../controllers/admin/updateCourses");
const {getAllCourses} = require("../controllers/admin/getAllCourses");

adminRouter.post("/signup", signup);
adminRouter.post("/login", login);
adminRouter.post("/courses", createCourse);
adminRouter.put("/courses", updateCourse);
adminRouter.get("/courses/bulk", getAllCourses);

module.exports = {
    adminRouter
};
