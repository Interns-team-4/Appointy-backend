"use strict"

const sgMail = require("@sendgrid/mail");
const { sendGrid, sendGridEmail: FROM_MAIL } = require("../config/index");
sgMail.setApiKey(sendGrid);


module.exports = async function (toEmail, subject, msg) {
    const mailrequest = {
        to: toEmail,
        from: FROM_MAIL,
        subject: subject,
        html: msg
    }
    sgMail.send(mailrequest).then(() => console.log("success")).catch(() => console.log("error"))

}

