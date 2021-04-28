"use strict"

const bcrypt = require("bcrypt");
const User = require("../../models/User");
const errorCodes = require("../ErrorCodes/errorcodes");
const AppError = require('../AppError/AppError');
const { throttle } = require("lodash");

class UserService {

    constructor() {
        this.addUser = this.addUser.bind(this)
    }

    async addUser(requsetData) {

        const { name, email, password, confirm_password } = requsetData;
        this.confirmPasswordCheck(password, confirm_password);
        this.accountExistCheck(email)
        const hashPassword = await this.passwordHash(requsetData.password);
        const userData = new User({
            name,
            email,
            password: hashPassword
        })

        try {
            await userData.save();
            return {
                status: true,
                status: 201,
                message: "SignIn Successfully!!"
            }
        }
        catch (err) {
            throw new AppError(errorCodes["USR_SAVE_ERROR"]);
        }
    }

    async passwordHash(password) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword;
    }

    confirmPasswordCheck = (pass, confPass) => {
        if (pass != confPass) {
            throw new AppError(errorCodes["PASSWORD_MISMATCH"]);
        }
    }

    accountExistCheck = async (email) => {

        try {
            const response = await User.findOne({ email }).then
            if (response) {
                throw new AppError(errorCodes["EMAIL_ID_ALREADY_EXIT"])
            }
        }
        catch (err) {
            throw new AppError(errorCodes["EMAIL_ID_ALREADY_EXIT"])
        }

    }

}

module.exports = new UserService();