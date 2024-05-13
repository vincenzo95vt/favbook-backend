const nodeMailer = require("nodemailer");

//Aqui creamos el transportador donde decimos que servicio vamos a usar
const transporter = nodeMailer.createTransport({
    service: "gmail",
    //Aqui ponemos correo electronico y contraseña del proyecto
    auth: {
        user: "favbookcs@gmail.com",
        pass: "rwik uwbu pljo ffvq",
    //Para obtener la contraseña del proyecto debes tener la verificacion 
    //de doble factor activada en la cuenta que vayas a usar
    },
});


const sendEmail = async (to, subject, html) => {
    try {
        //Aqui creamos las opciones del email el cual vamos a enviar
        const mailOptions = {
            //Quien envia el correo (Nosotros)
            from: "favbookcs@gmail.com",
            //Quien recibe el correo
            to: to,
            //Asunto del correo
            subject: subject,
            //Cuerpo del correo, el cual reacciona como un html
            html: html,
        };

        //Y aqui le decimos que transporter envie un email con las optiones creadas por nosotros
        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error("Error sending the message", error.message);
    }
};

module.exports = sendEmail;