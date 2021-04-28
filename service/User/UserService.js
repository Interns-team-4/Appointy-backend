"use strict"

const bcrypt = require("bcrypt");
const User = require("../../models/User");
const errorCodes = require("../ErrorCodes/errorcodes");
const AppError = require('../AppError/AppError');
const jwt = require("jsonwebtoken");
const { secret } = require("../../config/index");
const EmailService = require("../EmailService/emailService");

class UserService {

    constructor() {
        this.addUser = this.addUser.bind(this);
        this.login = this.login.bind(this);
    }

    async fetchAllUser() {

        try {
            const users = await User.find({ role: "user" });
            return {
                status: true,
                status_code: 201,
                message: "data fetched successfully!!",
                user_data: {
                    data: users
                }
            }
        }
        catch (err) {
            throw new AppError(errorCodes["USR_FETCH_ERROR"]);
        }

    }

    async addUser(requsetData) {

        const { name, email, password, confirm_password, role } = requsetData;
        this.confirmPasswordCheck(password, confirm_password);
        // if (await this.accountExistCheck(email)) throw new AppError(errorCodes["EMAIL_ID_ALREADY_EXIT"]);

        const hashPassword = await this.passwordHash(requsetData.password);


        // generateRandomString
        const randomString = EmailService.generateRandomString();


        const userData = new User({
            name,
            email,
            password: hashPassword,
            role: role,
            verification: randomString,
            isEnabled: false
        })

        //    account verification ..
        EmailService.signupMailVerification(email, randomString);

        try {
            await userData.save();
            return {
                status: true,
                status_code: 201,
                message: "SignIn Successfull please check verify the mail!!"
            }
        }
        catch (err) {
            throw new AppError(errorCodes["USR_SAVE_ERROR"]);
        }
    }

    async login(requestData) {

        const { email, password } = requestData;
        const existData = await this.accountExistCheck(email);

        if (!existData) throw new AppError(errorCodes["EMAIL_ID_NOT_FOUND"]);

        if (existData && !existData.isEnabled) throw new AppError(errorCodes["VERIFICATION_NOT_VERIFIED"]);

        if (! await this.passwordMatch(password, existData.password)) throw new AppError(errorCodes["PASSWORD_WRONG"]);

        const token = jwt.sign({ id: existData._id }, secret, { expiresIn: "1 days" });

        return {
            status: true,
            status_code: 201,
            message: "Login Successfull!",
            user_data: {
                token: token
            }
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
        const response = await User.findOne({ email });
        if (response) {
            return response;
        }

        return false;
    }

    async passwordMatch(password, hashPassword) {
        const response = await bcrypt.compare(password, hashPassword);
        console.log(response);
        return response;
    }

}

module.exports = new UserService();
