const router = require('express').Router()
const productsController = require('../controllers/products.controller')


// Add products 
router
    .route('/add-product')
    .post(productsController.addProducts)
// Update Product Details
router
    .route('/update-product')
    .put(productsController.updateProductDetails)
// Delete Product
router
    .route('/delete-product')
    .delete(productsController.deleteProduct)

router
    .route('/get-product')
    .get(productsController.getAllProduct)






module.exports = router;