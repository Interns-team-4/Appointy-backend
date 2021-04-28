"use strict"

const crypto = require("crypto");
const User = require("../../models/User");
const sendMailer = require("../../utils/email_sender");
const AppError = require("../AppError/AppError");
const errorCodes = require("../ErrorCodes/errorcodes");

class EmailService {

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

}

module.exports = new EmailService();
