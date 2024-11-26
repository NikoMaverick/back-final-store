const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get("/", (req, res) => {
    res.json({mensaje: "Parece que la primera ruta en routes funciona"})
})

module.exports = router