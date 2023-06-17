const express = require('express');
const router = express.Router();
const registration = require('./auth.js');
const category = require('./category.js');
const product = require('./product.js');


router.use('/auth', registration);
router.use('/category', category);
router.use('/product', product);


module.exports = router;