const mongoose = require("mongoose");
const config = require("../config/index");

mongoose.connect(`${config.mongoUrl}/${config.dbName}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Database connected!!")
})


// mongodb+srv://calendar:calendar@cluster0.bg0q7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority