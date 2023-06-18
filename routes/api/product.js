const express = require('express');
const { secureUpload, createProduct, createVariant } = require('../../controllers/productsControllers/productController');
const router = express.Router();


router.post('/createproduct', secureUpload, createProduct);
router.post('/createvariant', createVariant);


module.exports = router; 