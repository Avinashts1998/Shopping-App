const userController = require('../controllers/user.controller')

const router = require('express').Router()

//  Register User //
router
    .route('/register-user')
    .post(userController.regitserUser)

router
    .route('/user-login')
    .post(userController.userLogin)


module.exports = router;