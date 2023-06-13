const express = require('express');
const router = express.Router();
const registration = require('./auth.js');
const category = require('./category.js');


router.use('/auth', registration);
router.use('/category', category);


module.exports = router;