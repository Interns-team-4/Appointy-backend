require("dotenv").config();

const config = {
    mongoUrl: process.env.MONGO_URL,
    dbName: process.env.DB_NAME
}

module.exports = config;