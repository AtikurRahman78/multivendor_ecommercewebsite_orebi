const express = require('express');
const { secureUpload, createProduct } = require('../../controllers/productsControllers/productController');
const router = express.Router();


router.post('/createproduct', secureUpload, createProduct);


module.exports = router; 