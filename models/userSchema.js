// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//     email: { type: String, unique: true },
//     password: String,
//     firstName: String,
//     lastName: String
// });
// const userModel=mongoose.model(userSchema);

// module.exports={
//     userModel,
// }

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

// ✅ Pass a string name for the model, and the schema itself
const userModel = mongoose.model("User", userSchema);

module.exports = {userModel};
