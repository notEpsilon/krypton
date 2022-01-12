import { createTransport, SendMailOptions } from 'nodemailer';

const options = {
    host: 'smtp.office365.com',
    port: '587',
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASS
    },
    secureConnection: false,
    tls: { ciphers: 'SSLv3' }
};

const transporter = createTransport(<any>options);

/** Sends an Email Containing The Password */
const sendMail = (email: string, password: string) => {
    const mailOptions: SendMailOptions = {
        from: process.env.MAILER_EMAIL,
        to: email,
        subject: 'Krypton Camp User Authentication Password',
        text: `Welcome ${email}!\nYour Password is: ${password}`
    };

    transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Sent: ${res.response}`);
    });
};

export default sendMail;
