import { Router } from "express";
import { authenticateUser } from "../middleware/auth.js";
import { validateSignup, validateLogin, validateRequest } from "../middleware/validators.js";

const userRouter = Router();

import { signup } from "../controllers/users/signup.js";
import { login } from "../controllers/users/login.js";
import { getPurchases } from "../controllers/users/getPurchases.js";

// Public routes
userRouter.post("/signup", validateSignup, validateRequest, signup);
userRouter.post("/login", validateLogin, validateRequest, login);

// Protected routes
userRouter.use(authenticateUser);
userRouter.get("/purchases", getPurchases);

export { userRouter };