// module.exports = (req, res) => {
//     res.send({ message: "Admin login route hit!" });
// };
const bcrypt = require("bcrypt");
const { adminModel } = require("../../models/index.js"); // Adjust the path if needed
const admin_jwt_secret = require("process.env.admin_jwt_secret")


const { login } = async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        const adminuser = await adminModel.findOne({
            email: email,
            password: password
        });
        if(!adminuser){
            res.json({
                message:"invalid username "
            });
        }

        const matchedPassword = await bcrypt.compare(password, adminuser.password);
        if(!matchedPassword){
            res.json({
                message:"Invalid password"

            });
        }

        if (adminuser && matchedPassword) {
            const token = jwt.sign({

            })
        }
    }
    


}