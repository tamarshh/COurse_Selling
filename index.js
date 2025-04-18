const express = require("express");
const dbConnect = require("./config/db"); // ✅ Import your DB connection

const { userRouter } = require("./routes/users");
const { courseRouter } = require("./routes/courses");
const { adminRouter } = require("./routes/admin");

const app = express();
require("dotenv").config();

app.use(express.json());

// Connect to DB
dbConnect();

// Use Routes
app.use("/users", userRouter);
app.use("/courses", courseRouter);
app.use("/admin", adminRouter);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is online on port ${PORT}`);
});
