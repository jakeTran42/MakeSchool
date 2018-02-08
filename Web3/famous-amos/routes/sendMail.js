// const express = require('express');
// const sendMail = express.Router();
// const emailUtil = require('./email-util');
//
// const { sendEmail } = emailUtil;
//
//
// sendMail.post('/mail', async (req,res,next) => {
//     const { recipient, message } = req.body;
//     try {
//         await sendMail(recipient, message);
//         res.json({message: 'Message Had been sent'});
//         await next();
//     } catch (e) {
//         await next(e);
//     }
// })
//
//
// module.exports = sendMail;

const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: 'key-f2363a3cecb3d70a038d6e7331d1a953',
        domain: 'sandbox53db254edb424fcf8ef6f506520f37f8.mailgun.org'
    }
}

const nodemailerMailgun = nodemailer.createTransport(mg(auth));


nodemailerMailgun.sendMail({
    from: 'jake.tran@students.makeschool.com',
    to: 'recipient@domain.com',
    subject: 'Hello!',
    text: 'Hello!',
}, function (err, info) {
    if (err) {
        console.log('Error:' + err)
    }
    else {
        console.log('Response: ' + info)
    }
})
