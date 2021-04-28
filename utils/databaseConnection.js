const mongoose = require("mongoose");
const config = require("../config/index");

mongoose.connect(`${config.mongoUrl}/${config.dbName}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Database connected!!")
})

