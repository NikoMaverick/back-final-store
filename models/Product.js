const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    team: String,
    year: String,
    description: String,
    country: String,
    league: String,
    image: String,
    size: String,
    price: Number,
}, {timestamps: true})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product