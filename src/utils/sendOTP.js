const { sendGmail } = require("../lib/nodemailer/index");

const sendOTP = async (to, otp) => {
  return await sendGmail(
    to,
    "Login service OTP code",
    `Hello dear!\nYour OTP: ${otp}\n\nPlease don't share this code!`
  );
};

module.exports = { sendOTP };
