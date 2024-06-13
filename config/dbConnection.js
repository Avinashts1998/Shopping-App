const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config();

const clientOptions = {
    autoIndex: false,
}
const initClientDbConnection = () => {
    try {
        const db = mongoose.createConnection(process.env.MONGO_CONNECTION_URL, clientOptions)

        db.on("error", console.error.bind(console, "MongoDB Connection Error"))
        db.once("open", function () {
            console.log('Database Connected Successfuly || Ready for imcoming requests')

        });
        return db;
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    initClientDbConnection
}