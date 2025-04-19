import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import expressLayouts from "express-ejs-layouts";

// Import routes
import { userRouter } from "./routes/userRoutes.js";
import { courseRouter } from "./routes/courseRoutes.js";
import { adminRouter } from "./routes/adminRoutes.js";

// Import middleware
import { errorHandler } from "./middleware/errorHandler.js";
import { apiLimiter, authLimiter, purchaseLimiter } from "./middleware/rateLimiter.js";
import { accessLogger, errorLogger, consoleLogger } from "./middleware/logger.js";
import { setUser } from './middleware/setUser.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static(path.join(process.cwd(), 'public')));

// Logging middleware
app.use(consoleLogger);
app.use(accessLogger);
app.use(errorLogger);

// Rate limiting
app.use(apiLimiter);

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));
app.set('layout', 'layout');

// Use the setUser middleware
app.use(setUser);

// Frontend Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Course Selling Platform'
    });
});

app.get('/signup', (req, res) => {
    res.render('signup', { 
        title: 'Sign Up',
        role: 'user', // Default to user signup
        error: req.query.error || null // Pass error if it exists
    });
});

app.get('/admin/signup', (req, res) => {
    res.render('signup', { 
        title: 'Admin Sign Up',
        role: 'admin'
    });
});

app.get('/login', (req, res) => {
    res.render('login', { 
        title: 'Login',
        role: 'user'
    });
});

app.get('/admin/login', (req, res) => {
    res.render('login', { 
        title: 'Admin Login',
        role: 'admin'
    });
});

app.get('/courses', (req, res) => {
    res.render('courses', {
        title: 'Available Courses'
    });
});

app.get('/courses/preview/:courseId', (req, res) => {
    res.render('coursePreview', {
        title: 'Course Preview',
        courseId: req.params.courseId
    });
});

// API Routes
app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);
app.use("/api/admin", adminRouter);

// Apply auth limiter to auth routes
app.use("/api/users/signup", authLimiter);
app.use("/api/users/login", authLimiter);
app.use("/api/admin/signup", authLimiter);
app.use("/api/admin/login", authLimiter);

// Apply purchase limiter to purchase route
app.use("/api/courses/purchase", purchaseLimiter);

// Error handling middleware
app.use(errorHandler);

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        // Handle server errors
        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`Port ${PORT} is already in use`);
                process.exit(1);
            }
            console.error('Server error:', error);
            process.exit(1);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

app.post('/api/users/signup', async (req, res) => {
    try {
        // Your signup logic here
        // On success, redirect to login
        res.redirect('/login');
    } catch (error) {
        // Handle error and redirect back to signup with error message
        res.redirect('/signup?error=' + encodeURIComponent(error.message));
    }
});

app.post('/api/users/login', async (req, res) => {
    try {
        // Your login logic here
        // On success, redirect to user dashboard
        res.redirect('/dashboard');
    } catch (error) {
        // Handle error and redirect back to login with error message
        res.redirect('/login?error=' + encodeURIComponent(error.message));
    }
});
