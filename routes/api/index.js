const express = require('express');
const router = express.Router();
const registration = require('./auth.js');


router.use('/auth', registration);


module.exports = router;