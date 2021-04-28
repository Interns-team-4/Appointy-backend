require("dotenv").config();

const config = {
    mongoUrl: process.env.MONGO_URL,
    dbName: process.env.DB_NAME,
    secret: process.env.SECRET
}

module.exports = config;