const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const apiStoreController = require('../controllers/apiStoreController');

router.get('/apistore', apiStoreController.showProductsApi); 
router.get('/apistore/:productId', apiStoreController.showProductByIdApi); 
router.get('/apistore/category/:category', apiStoreController.showProductsByCategoryApi); 

router.get('/dashboard', apiStoreController.showProductsApi); 
router.get('/dashboard/new', apiStoreController.showNewProductApi); 
router.get('/dashboard/category/:category', apiStoreController.showProductsByCategoryApi); 

router.post('/dashboard', apiStoreController.createProductApi); 

router.get('/dashboard/:productId', apiStoreController.showProductByIdApi); 
router.get('/dashboard/:productId/edit', apiStoreController.showEditProductApi); 

router.put('/dashboard/:productId', apiStoreController.updateProductApi);

router.delete('/dashboard/:productId/delete', apiStoreController.deleteProductApi);

module.exports = router
