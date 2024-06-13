const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
},
    { strict: false });

exports.UserSchema = UserSchema;