const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      pool: true,
      host: process.env.SMTP_HOST, //"smtp-mail.outlook.com",
      port: process.env.SMTP_PORT, //587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivationMail(userEmail, link) {
    const message = {
      from: process.env.SMTP_USER,
      to: userEmail,
      subject: `Account activation - ${link}`,
      text: "",
      html: `
            <div>
                <h1>Click the link for activatiob</h1>
                <a href="${link}">${link}</a>
            </div>
        `,
    };

    const info = await this.transporter.sendMail(message);
    const response = { result: false, message: "" };

    if (info.response.substr(0, 3) == "250") {
      return true;
    }

    return false;
  }
}

module.exports = new MailService();
