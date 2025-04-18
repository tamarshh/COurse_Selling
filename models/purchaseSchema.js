const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const purchaseSchema = new mongoose.Schema({
    _id: ObjectId,
    userid: ObjectId,
    courseid: ObjectId
});

const purchaseModel = mongoose.model("purchases", purchaseSchema);
module.exports = {
    purchaseModel,
};
