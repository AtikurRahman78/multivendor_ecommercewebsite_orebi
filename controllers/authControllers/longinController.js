const User = require("../../models/userModels");
const emailValidation = require("../../helpers/emailValidation");
const bcrypt = require('bcrypt');


let loginController = async (req, res) => {

    const { email, password } = req.body;

    if (!emailValidation(email)) {
        return res.send({ error: "Invalid email!" });
    } else if (!email) {
        return res.send({ error: "Email is required!" });
    } else if (!password) {
        return res.send({ error: "Password is required!" });
    } else {

        let isEmailExist = await User.find({ email });

        if (isEmailExist.length > 0) {

            bcrypt.compare(password, isEmailExist[0].password).then(function (result) {

                if (result) {
                    res.send({
                        success: "Login completed successfully!",
                        fullName: isEmailExist.fullName,
                        email: isEmailExist.email,
                    });
                } else {
                    res.send({ error: "Password not match!" });
                }

            });

        } else {
            res.send({ error: "Email not found!" })
        }

    }

}



module.exports = loginController;