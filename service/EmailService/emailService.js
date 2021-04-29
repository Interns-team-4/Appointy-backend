"use strict"

const crypto = require("crypto");
const User = require("../../models/User");
const sendMailer = require("../../utils/email_sender");
const AppError = require("../AppError/AppError");
const errorCodes = require("../ErrorCodes/errorcodes");
const otpGenerate = require("../../utils/otp_generater");
const AppClass = require("../app-class/app-class");

class EmailService extends AppClass {


    signupMailVerification(email, randmString) {
        const subject = "Account Verification";
        const contentMessage = `<a href='http://localhost:8080/api/v1/account_verification/${randmString}'>Please click the below button for verification !!</a>`;
        if (sendMailer(email, subject, contentMessage)) return true;
        return false;
    }

    generateRandomString() {
        const id = crypto.randomBytes(20).toString('hex');
        return id;
    }

    async accountVerification(verifyId) {
        const verification_id = verifyId.id;
        const user_data = await User.findOne({ verification: verification_id });

        if (!user_data) {
            throw new AppError(errorCodes["VERIFICATION_ID_NOT_FOUND"]);
        }

        try {
            await User.updateOne({ _id: user_data._id }, { $set: { isEnabled: true } });
            return {
                status: true,
                status_code: 200,
                message: `Hey ${user_data.name || 'User'} your Email verified Successfully!!`
            }
        }
        catch (err) {
            throw new AppError(errorCodes["VERIFICATION_FAILED"]);
        }
    }

    async generateOtp(requestData) {
        const { email } = requestData

        const existData = await this.accountExistCheck(email);
        if (!existData) throw new AppError(errorCodes['EMAIL_ID_NOT_FOUND']);

        if (!existData.isEnabled) throw new AppError(errorCodes["EMAIL_NOT_VERIFIED"]);

        const otpData = otpGenerate();


        const subject = "Forgot password";
        const contentMessage = `<br>Otp for changing password ${otpData.otp} <br> Note Otp will expired in 5 mins`;
        if (!sendMailer(email, subject, contentMessage)) throw new AppError(errorCodes["UNKNOWN_ERROR"]);


        try {
            await User.updateOne({ email }, { $set: { otp: otpData.otp, otp_secret: otpData.secret } })
            return {
                status: true,
                status_code: 201,
                message: "Otp send to your registered mail!!"
            }
        }
        catch (err) {
            throw new AppError(errorCodes["UNKNOWN_ERROR"])
        }
    }


    async accountExistCheck(email) {
        const response = await User.findOne({ email });
        if (response) {
            return response;
        }

        return false;
    }


}

module.exports = new EmailService();
