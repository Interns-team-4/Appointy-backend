const jwt = require("jsonwebtoken");
const errorCodes = require("../service/ErrorCodes/errorcodes");
const { secret } = require("../config/index");
const User = require("../models/User");

const Auth = async (req, res, next) => {

    try {
        const token = req.header('authorization');
        if (!token) return res.status(404).send(errorCodes["TOKEN_MISSING"]);

        const is_valid = await jwt.decode(token, secret);

        if (!is_valid) return res.status(404).send(errorCodes["TOKEN_WRONG"]);

        req.user = await User.findOne({ _id: Object(is_valid.id) });

        next();
    }
    catch (err) {
        res.status(500).send(errorCodes["INTERNAL_ERROR"]);
    }

}


const isSigned = () => {

}

module.exports = Auth;