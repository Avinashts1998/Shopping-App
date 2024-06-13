const { request, response } = require("express");
const ProductModel = require('../models/products.model')
const CartModel = require("../models/cart.model")




exports.getAllProducts = async (request, response) => {
    try {
        const dbName = "Shop"
        const dbCollection = "Products"

        const dbConnection = global.clientConnection
        const shopDb = dbConnection.useDb(dbName)

        const products = shopDb.model(dbCollection, ProductModel.ProductSchema, dbCollection)
        const productData = await products.find()

        response.status(200).json({
            data: productData
        })

    } catch (error) {
        throw error;
    }

}

exports.addTocart = async (request, response) => {
    const { product_name, product_id, customer_id, product_quantity } = request.body.params;

    const dbName = "Shop"
    const dbCollection = "Products"
    const cartDbCollection = "Cart"

    const dbConnection = global.clientConnection
    const shopDb = dbConnection.useDb(dbName)

    const products = shopDb.model(dbCollection, ProductModel.ProductSchema, dbCollection)
    const productData = await products.findOne({ "product_id": product_id })

    const totalProice = productData.price * product_quantity

    const cartItems = {
        proproduct_name: productData.product_name,
        product_id: productData.product_id,
        customer_id: customer_id,
        product_quantity: product_quantity,
        total_price: totalProice
    }
    const cart = shopDb.model(cartDbCollection, CartModel.CartSchema, cartDbCollection)
    await cart.create(cartItems)

    response.status(200).json({
        message: 'prodcut added to cart'
    })



}