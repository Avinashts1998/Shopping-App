const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    produsct_id: {
        type: Number,
    },
    product_name: {
        type: String
    },
    product_image: {
        type: String
    },
    price: {
        type: String
    },
    image: {
        type: String
    }
},
    { strict: false });

exports.ProductSchema = ProductSchema;