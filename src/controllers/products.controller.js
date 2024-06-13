
const { version } = require('mongoose')
const ProductModel = require('../models/products.model')


exports.addProducts = async (request, response) => {

    try {
        const dbName = "Shop"
        const dbCollection = "Products"

        const dbConnection = global.clientConnection
        const shopDb = dbConnection.useDb(dbName)

        const products = shopDb.model(dbCollection, ProductModel.ProductSchema, dbCollection)

        const exist_data = await products.find()

        let updatedID = await autoIncreamentFns(exist_data)

        const input_params = {
            "product_name": request.body.product_name,
            "product_id": updatedID,
            "product_image": request.body.product_image,
            "price": request.body.price
        }

        const result = await products.create(input_params).then((data) => {
            console.log("data inserted")
        })

        response.status(200).json({
            message: 'Data inserted',
            data: input_params

        })
    } catch (error) {
        console.log(error)
    }

}


exports.updateProductDetails = async (request, response) => {
    const dbName = "Shop"
    const dbCollection = "Products"

    const projectID = request.body.argsData._id
    const updateValue = request.body.params

    const dbConnection = global.clientConnection
    const shopDb = dbConnection.useDb(dbName)

    const products = shopDb.model(dbCollection, ProductModel.ProductSchema, dbCollection)

    await products.findOneAndUpdate({ "id": projectID }, updateValue)
    response.status(200).json({
        message: 'Data Updated'
    })
}


exports.deleteProduct = async (request, response) => {
    const dbName = "Shop"
    const dbCollection = "Products"

    const projectID = request.body

    const dbConnection = global.clientConnection
    const shopDb = dbConnection.useDb(dbName)

    const products = shopDb.model(dbCollection, ProductModel.ProductSchema, dbCollection)

    await products.deleteOne({ "_id": projectID })
    response.status(200).json({
        message: 'Product Deleted '
    })
}

exports.getAllProduct = async (request, response) => {
    const dbName = "Shop"
    const dbCollection = "Products"

    const projectID = request.body

    const dbConnection = global.clientConnection
    const shopDb = dbConnection.useDb(dbName)

    const products = shopDb.model(dbCollection, ProductModel.ProductSchema, dbCollection)

    const product = await products.find()
    console.log(product)

    response.status(200).json({
        message: 'Product Deleted',
        data: product
    })
}

// AutoIncreamet Function //

const autoIncreamentFns = (product_data) => {

    let sortedArr = []
    product_data.forEach(element => {
        if (sortedArr[0]?.product_id > element.product_id) {
            sortedArr.unshift(element)
        } else {
            sortedArr.push(element)
        }
    });

    let reverserdProduct = sortedArr.reverse()
    let updatedProductId = parseInt(reverserdProduct[0].product_id)
    return updatedProductId + 1;
}