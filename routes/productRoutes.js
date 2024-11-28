const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const productController = require('../controllers/productController');


router.get('/', productController.showProducts); // 1.
router.get('/products', productController.showProducts); // 1.
router.get('/products/:productId', productController.showProductById); // 2.
router.get('/products/category/:category', productController.showProductsByCategory); // 11.

router.get('/dashboard', productController.showProducts); // 3.
router.get('/dashboard/new', productController.showNewProduct); // 4.
router.get('/dashboard/category/:category', productController.showProductsByCategory); // 10.

router.post('/dashboard', productController.createProduct); // 5.

router.get('/dashboard/:productId', productController.showProductById); // 6.
router.get('/dashboard/:productId/edit', productController.showEditProduct); // 7.



router.delete('/dashboard/:productId/delete', productController.deleteProduct); // 9.


module.exports = router
