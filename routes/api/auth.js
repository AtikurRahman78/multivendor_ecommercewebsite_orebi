const express = require('express');
const registrationController = require('../../controllers/authControllers/registrationController');
const loginController = require('../../controllers/authControllers/longinController');
const emailVerificationOtpController = require('../../controllers/authControllers/emailVerificationOtpController');
const router = express.Router();

router.post('/registration', registrationController);
router.post('/login', loginController);
router.post('/emailVerificationOtp', emailVerificationOtpController);



module.exports = router;