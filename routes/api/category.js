const express = require('express');
const { categoryController, categoryStatus, subCategoryController, subCategoryStatus, getAllCategory,getAllSubCategory } = require('../../controllers/categroyControllers/categoryController');
const router = express.Router();

// =========== Category Routes ============
router.post('/createcategory', categoryController);
router.post('/status', categoryStatus);

// =========== Sub Category Routes ============
router.post('/createsubcategory', subCategoryController);
router.post('/subcategorystatus', subCategoryStatus);

// ============ Fetch Data From Database =============

// Get All Category Data
router.get('/getallcategory', getAllCategory);

// Get All Sub Category Data
router.get('/getallsubcategory', getAllSubCategory);

module.exports = router;