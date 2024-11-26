const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const productController = require('../controllers/productController');



router.get('/', productController.showProducts); 



module.exports = router