const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: "favbookcs@gmail.com",
        pass: "rwik uwbu pljo ffvq",
    },
});


const sendEmail = async (to, subject, html) => {
    try {
        
        const mailOptions = {
            from: "favbookcs@gmail.com",
            to: to,
            subject: subject,
            html: html,
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error("Error sending the message", error.message);
    }
};

module.exports = sendEmail;