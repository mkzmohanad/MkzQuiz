const nodemailer = require("nodemailer")
const pug = require("pug");
const htmlToText = require("html-to-text");

module.exports = class Email {
    constructor(user , url) {
        this.to = user.email;
        this.firstName = user.username.split(" ")[0];
        this.url = url;
        this.from = process.env.EMAIL_FROM; 
    }

    newTransporter() {
        if(process.env.NODE_ENV === "production") {
            return nodemailer.createTransport({
                service : "Brevo",
                auth : {
                    user : process.env.BREVO_LOGIN,
                    pass : process.env.BREVO_KEY,
                }
            })
        }
        else {
            return nodemailer.createTransport({
                host : process.env.NODE_MAILER_HOST,
                port : process.env.NODE_MAILER_PORT,
                auth : {
                    user : process.env.NODE_MAILER_USERNAME,
                    pass : process.env.NODE_MAILER_PASSWORD,
                }
            })
        } 
    }
    
    async send(template , subject) {
        const html = pug.renderFile(`${__dirname}/../Views/Emails/${template}.pug` , {
            firstName : this.firstName,
            url : this.url,
            subject
        });

        const emailOptions = {
            from : this.from,
            to : this.to,
            subject,
            html,
            text : htmlToText.htmlToText(html)
        }

        await this.newTransporter().sendMail(emailOptions);
    }

    async welcomeMessage() {
        await this.send("welcome" , "Welcome to (MKZ-QUIZ) I appreciate your visit and hope you enjoy.")
    }
    
    async resetPassword() {
        await this.send("resetPassword" , "Your password reset token (it's only valid for 10 minutes!)")
    }
}