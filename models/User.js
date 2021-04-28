const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    isEnabled: {
        type: Boolean
    }
})

const User = mongoose.model("user", userSchema);

module.exports = User;
