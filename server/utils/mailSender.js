const nodemailer = require("nodemailer") 

const mailSender = async (email, title, body) => {

    try {

        const transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: 587,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        })

        const mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: email,
            title: `${title}`,
            html: `${body}`,
        }

        const info = await transporter.sendMail(mailOptions)
        console.log(info);
        return info;
    } catch (error) {
        console.log(error);
    }
}

module.exports = mailSender;