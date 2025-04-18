const { Router } = require("express");
const userRouter = Router();

const {signup} = require("../controllers/users/signup");
const {login} = require("../controllers/users/login");
const {getPurchases} = require("../controllers/users/getPurchases");

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/getpurchases", getPurchases);

module.exports = {
    userRouter
};
