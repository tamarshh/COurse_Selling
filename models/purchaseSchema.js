import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    purchaseDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'completed' }
});

const purchaseModel = mongoose.model("Purchase", purchaseSchema);

export { purchaseModel };
