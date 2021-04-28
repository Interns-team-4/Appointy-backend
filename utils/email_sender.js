"use strict"

const sgMail = require("@sendgrid/mail");
const { sendGrid, sendGridEmail: FROM_MAIL } = require("../config/index");
sgMail.setApiKey(sendGrid);


module.exports = async function (toEmail, subject, msg) {
    const mailrequest = {
        to: toEmail,
        from: FROM_MAIL,
        subject: subject,
        text: msg
    }

    try {
        sgMail.send(mailrequest)
        return true;
    }
    catch (err) {
        return false;
    }
}

