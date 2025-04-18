const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect =  async() => {
    mongoose.connect(process.env.db_url, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => console.log("✅ DB connected successfully"))
    .catch((error) => {
        console.error("❌ DB connection error:");
        console.error(error.message);
        process.exit(1);
    });
};

module.exports = {dbConnect};
