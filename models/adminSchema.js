import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

const adminModel = mongoose.model("Admin", adminSchema);

export { adminModel };

