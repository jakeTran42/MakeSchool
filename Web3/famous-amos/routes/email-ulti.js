const emailConfig = require('./email-config')();

const mailgun = required('mailgun-js')(emailConfig);

export.sendEmail = (recipient, message, attachment) =>
    new Promise((resolve, reject) => {
        const data = {
            from: 'jake.tran@students.makeschool.com'
            to: recipient,
            subject: message.subject,
            text: message.TEXT,
            inline: attachment,
            html: mesag\.html
        };

        mailgun.messages().send(data, (error) => {
            if (error) {
                return reject(error)
            }
            return resolve();
        })    
    })
