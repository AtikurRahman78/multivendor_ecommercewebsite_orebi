const emailValidation = require('../../helpers/emailValidation');
const User = require('../../models/userModels.js');
const bcrypt = require('bcrypt');
const emailVerification = require('../../helpers/emailVerification');
const otpTemplate = require('../../helpers/otpTemplate');
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");

let registrationController = async (req, res) => {

    const { fullName, email, password, avatar, facebookId, linkedinId } = req.body;

    if (!fullName) {
        return res.send({ error: "Full Name is required!" });
    } else if (!emailValidation(email)) {
        return res.send({ error: "Invalid email!" });
    } else if (!email) {
        return res.send({ error: "Email is required!" });
    } else if (!password) {
        return res.send({ error: "Password is required!" });
    } else {



        let duplicateEmail = await User.find({ email });

        if (duplicateEmail.length > 0) {
            return res.send({ error: "Email already exists!" });
        }

        bcrypt.hash(password, 10, async function (err, hash) {

            let user = new User({
                fullName,
                email,
                password: hash,
                avatar,
                facebookId,
                linkedinId
            });

            user.save();

            const generator2 = aleaRNGFactory(Date.now());

            let randomNumber = generator2.uInt32().toString().substring(0, 4);

            let randomNumberStore = await User.findOneAndUpdate(
                { email },
                { $set: { randmomOtp: randomNumber } },
                { new: true }
            );

            emailVerification(user.email, "Please verify your email", randomNumber, otpTemplate,);

            // setTimeout(async function () {

            //     console.log('OTP deleted!');

            //     let randomNumberStore = await User.findOneAndUpdate(
            //         { email },
            //         { $unset: { randmomOtp: '' } },
            //         { new: true }
            //     );

            // }, 3000);

            res.send({
                success: "Registration completed successfully! Please check your email",
                fullName: user.fullName,
                email: user.email,
            });

        });

    }



}

module.exports = registrationController;