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
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    isEnabled: {
        type: Boolean
    }
})

const User = mongoose.model("user", userSchema);

module.exports = User;
