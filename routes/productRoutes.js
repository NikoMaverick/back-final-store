const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const productController = require('../controllers/productController');


router.get('/', productController.showProducts); 
router.get('/products', productController.showProducts); 
router.get('/products/:productId', productController.showProductById); 
router.get('/products/category/:category', productController.showProductsByCategory); 

router.get('/dashboard', productController.showProducts); 
router.get('/dashboard/new', productController.showNewProduct); 
router.get('/dashboard/category/:category', productController.showProductsByCategory); 

router.post('/dashboard', productController.createProduct); 

router.get('/dashboard/:productId', productController.showProductById); 
router.get('/dashboard/:productId/edit', productController.showEditProduct); 

router.put('/dashboard/:productId', productController.updateProduct);

router.delete('/dashboard/:productId/delete', productController.deleteProduct);


module.exports = router
