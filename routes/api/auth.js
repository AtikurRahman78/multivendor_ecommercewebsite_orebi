const express = require('express');
const registrationController = require('../../controllers/authControllers/registrationController');
const loginController = require('../../controllers/authControllers/longinController');
const emailVerificationOtpController = require('../../controllers/authControllers/emailVerificationOtpController');
const { merchantController, merchantStatusController } = require('../../controllers/authControllers/merchantController.js');
const router = express.Router();

router.post('/registration', registrationController);
router.post('/login', loginController);
router.post('/emailVerificationOtp', emailVerificationOtpController);
router.post('/becomemerchat', merchantController);
router.post('/merchantstatus', merchantStatusController);



module.exports = router;