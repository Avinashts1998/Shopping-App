const { version } = require('mongoose')
const userModel = require('../models/users.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { response } = require('express');
const { use } = require('../routes/users');

exports.regitserUser = async (request, response) => {
    try {

        const { username, password } = request.body;

        const dbName = "Shop"
        const dbCollection = "Users"

        const dbConnection = global.clientConnection
        const shopDb = dbConnection.useDb(dbName)

        const users = shopDb.model(dbCollection, userModel.UserSchema, dbCollection)

        const existing_user = await users.findOne({ username })
        if (existing_user) {
            return response.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUSer = new users({ username: username, password: hashedPassword })

        await newUSer.save()
        response.status(200).json({
            message: "user-registered"
        })

    } catch (error) {
        console.log(error)

    }
}

exports.userLogin = async (request, response) => {
    try {
        const { username, password } = request.body

        const dbName = "Shop"
        const dbCollection = "Users"

        const dbConnection = global.clientConnection
        const shopDb = dbConnection.useDb(dbName)

        const users = shopDb.model(dbCollection, userModel.UserSchema, dbCollection)
        const user = await users.findOne({ username })
        if (!user) {
            response.status(400).json({
                message: "user does not exist"
            })
        }

        //  const passwordMatch = await bcrypt.compare({ user.password, password})

        //  if (!passwordMatch) {
        //     response.status(400).json({ message: "Invalid Password" })
        //  }

        //    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
        //     res.status(200).json({ token });



    } catch (error) {
        console.log(error)
    }
}


// Oreder related Apis //

