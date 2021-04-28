require("dotenv").config();

const config = {
    mongoUrl: process.env.MONGO_URL,
    dbName: process.env.DB_NAME,
    secret: process.env.SECRET,
    sendGrid: process.env.SEND_GRID,
    sendGridEmail: process.env.SEND_GRID_MAIL
}

module.exports = config;