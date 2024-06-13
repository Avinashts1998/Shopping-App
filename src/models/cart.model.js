const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    produsct_id: {
        type: Number,
    },
    product_name: {
        type: String
    },
    product_image: {
        type: String
    },
    customer_id: {
        type: String
    },
    product_quantiity: {
        type: Number
    },
    total_price: {
        type: String
    }
},
    { strict: false });

exports.CartSchema = CartSchema;