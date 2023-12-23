const { sendGmail } = require("../lib/nodemailer/index");
const { compare } = require("bcrypt");

const sendOTP = async (to, otp) => {
  return await sendGmail(
    to,
    "Login service OTP code",
    `Hello dear!\nYour OTP: ${otp}\n\nPlease don't share this code!`
  );
};

const regexPattern = /^\d{6}$/;
const isOTP = (otp) => {
  return regexPattern.test(otp);
};

const compareOTP = async (plain, hash) => {
  return await compare(plain, hash);
};

const validateOTP = async (otp, hashedOtp, createdAt) => {
  return (
    isExpired(createdAt, process.env.OTP_EXPIRE_SECONDS) &&
    (await compareOTP(otp, hashedOtp))
  );
};

module.exports = { sendOTP, isOTP, compareOTP, validateOTP };
