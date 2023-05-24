const User = require("../../models/userModels");

let emailVerificationOtpController = async (req, res) => {

    const { email, randmomOtp } = req.body;

    let findOtp = await User.find({ email });

    if (findOtp.length > 0) {

        if (randmomOtp == findOtp[0].randmomOtp) {
            let OtpRemoveAfterMatch = await User.findOneAndUpdate(
                { email },
                { $unset: { randmomOtp: '' } },
                { new: true }
            );
            res.send({ success: "OTP match!" });
        } else {
            res.send({ error: "OTP not match!" });
        }

    }

}

module.exports = emailVerificationOtpController;