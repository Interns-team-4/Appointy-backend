"use strict"

const crypto = require("crypto");
const User = require("../../models/User");
const sendMailer = require("../../utils/email_sender");
const AppError = require("../AppError/AppError");
const errorCodes = require("../ErrorCodes/errorcodes");
const otpGenerate = require("../../utils/otp_generater");
const AppClass = require("../app-class/app-class");
const ejs = require("ejs");
const path = require("path");
const moment = require("moment");

class EmailService extends AppClass {


    signupMailVerification(email, randmString) {
        const subject = "Account Verification";
        const contentMessage = `<table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td bgcolor="#0178BA">
                <table>
                    <tr>
                        <td style="padding: 40px 10px 40px 10px;"> </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#0178BA" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                            <h1 style="font-size: 40px; font-weight: 400; margin: 2;">Welcome to Appointy!</h1> <img src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw8BhozreeS5oZlAXbeIE4zTZfP-FixvfksQ&usqp=CAU" width="125" height="120" style="display: block; border: 0px;" />
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;">We're excited to have you get started. First, you need to verify your account. Just press the button below.</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center" style="border-radius: 3px;" bgcolor="#0178BA"><a href='http://localhost:8080/api/v1/account_verification/${randmString}' target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Verify Account</a></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;"><a href='http://localhost:8080/api/v1/account_verification/${randmString}' target="_blank" style="color: #0178BA;">Click here</a></p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;">If you have any questions, just reply to this email—we're always happy to help out.</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;">Regards,<br>Appointy Team</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#B8E2F2" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Powered by</h2>
                            <a href="https://codingmart.com/" target="_blank"><img src="https://res-2.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco/penxmpxq8civh7roulni" width="175.66" height="42.33" style="margin-top: 15px;"/></a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>`;
        if (sendMailer(email, subject, contentMessage)) return true;
        return false;
    }

    generateRandomString() {
        const id = crypto.randomBytes(20).toString('hex');
        return id;
    }


    async accountVerification(verifyId, res) {
        const verification_id = verifyId.id;
        const user_data = await User.findOne({ verification: verification_id });

        if (!user_data) {
            throw new AppError(errorCodes["VERIFICATION_ID_NOT_FOUND"]);
        }

        if (user_data.isEnabled) {
            return res.render('./already_verified')
        }

        try {
            await User.updateOne({ _id: user_data._id }, { $set: { isEnabled: true } });
            return res.render('./verifySuccess', { Name: `${user_data.name || 'User'}` })
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
        const html = await ejs.renderFile(path.join(__dirname, '../../views/otp_verification.ejs'), { otpData })

        const subject = "Forgot password";
        if (!sendMailer(email, subject, html)) throw new AppError(errorCodes["UNKNOWN_ERROR"]);


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


    loginVerification(email, deviceName, ip) {
        const subject = "Successful log-in  from new device";

        const templateData = {
            ip: ip,
            timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
            device: deviceName,
            email: email
        }

        ejs.renderFile(path.join(__dirname, '../../views/login_confirm.ejs'), { templateData }, (err, html) => {
            if (err) console.log("login mail html errror");
            sendMailer(email, subject, html);
        })





    }


    async meetingNotification(email, scheduleData) {


        const randmString = crypto.randomBytes(20).toString('hex')


        const AcceptLink = `http://localhost:8080/api/v1/add_notification/${email}/${scheduleData._id}/${randmString}`;
        const DeclineLink = `http://localhost:8080/api/v1/delete_notification/${email}/${scheduleData._id}/${randmString}`;

        // have to change....
        const subject = `Invitation :  ${scheduleData.eventName} @ ${scheduleData.eventDate} ( ${email} )`;
        const html = await ejs.renderFile(path.join(__dirname, '../../views/meet_notify.ejs'), { scheduleData, AcceptLink, DeclineLink })
        sendMailer(email, subject, html);
    }

    async meetingCancelNotification(email, scheduleData) {

        // have to change....
        const subject = `Cancelled :  ${scheduleData.eventName} @ ${scheduleData.eventDate} ( ${email} )`;
        const html = await ejs.renderFile(path.join(__dirname, '../../views/cancel_notify.ejs'), { scheduleData })
        sendMailer(email, subject, html);
    }

}

module.exports = new EmailService();
