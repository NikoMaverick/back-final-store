const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const productController = require('../controllers/productController');



router.get('/', productController.showProducts);
router.get('/products', productController.showProducts);


router.get('/dashboard', productController.showProducts);


router.post('/dashboard', productController.createProduct); 


module.exports = router