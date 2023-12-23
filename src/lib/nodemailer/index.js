const nodemailer = require("nodemailer");

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendGmail = async (to, subject, text) => {
  try {
    await mailTransport.sendMail({
      from: process.env.SMTP_USERNAME,
      to,
      subject,
      text,
    });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = { sendGmail };
