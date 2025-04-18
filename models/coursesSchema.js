const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageurl: String,
    creatorId: ObjectId
});

const coursesModel = mongoose.model( "courses",courseSchema);
module.exports = 
   { coursesModel};

