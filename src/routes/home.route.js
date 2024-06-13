const homeController = require("../controllers/home.controller")
const router = require('express').Router()


router
    .route('/get-all-products')
    .get(homeController.getAllProducts)

router
    .route('/add-to-cart')
    .post(homeController.addTocart)


module.exports = router;
