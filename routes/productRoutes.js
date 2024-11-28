const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const productController = require('../controllers/productController');



router.get('/', productController.showProducts);
router.get('/products', productController.showProducts);
router.get('/products/:productId', productController.showProductById);


router.get('/dashboard', productController.showProducts);
router.get('/dashboard/new', productController.showNewProduct); 


router.post('/dashboard', productController.createProduct); 

router.get('/dashboard/:productId', productController.showProductById);
router.get('/dashboard/:productId/edit', productController.showEditProduct); 

router.delete('/dashboard/:productId/delete', productController.deleteProduct);



module.exports = router
