const { Router } = require("express");
const courseRouter = Router();

const {purchaseCourse} = require("../controllers/courses/purchaseCourse");
const {previewCourse} = require("../controllers/courses/previewCourse");

courseRouter.post("/purchaseCourse", purchaseCourse);
courseRouter.get("/previewCourse", previewCourse);

module.exports = {
    courseRouter
};
