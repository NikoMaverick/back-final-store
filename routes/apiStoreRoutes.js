const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const apiStoreController = require('../controllers/apiStoreController');

router.get('/apistore', apiStoreController.showProductsApi); 
router.get('/apistore/:productId', apiStoreController.showProductByIdApi); 
router.get('/apistore/category/:category', apiStoreController.showProductsByCategoryApi); 

module.exports = router
