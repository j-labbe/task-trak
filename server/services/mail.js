const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");

const transporter = nodemailer.createTransport({
    service: "Gmail",

    auth: {
        user: process.env.NOTIFICATION_MAIL_ADDRESS,
        pass: process.env.NOTIFICATION_MAIL_PASSWORD
    }
});

const hbsOptions = {
    viewEngine: {
        extName: ".hbs",
        partialsDir: path.join(__dirname, "../templates/mail"),
        defaultLayout: false
    },
    viewPath: path.join(__dirname, "../templates/mail"),
    extName: ".hbs"
};

transporter.use("compile", hbs(hbsOptions));

const sendMail = (email, name, description, link) => {
    const mailOptions = {
        from: process.env.NOTIFICATION_MAIL_ADDRESS,
        to: email,
        subject: `Reminder: ${name}`,
        template: "reminder",
        context: {
            name,
            description,
            link
        }
    };
    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

module.exports = sendMail;