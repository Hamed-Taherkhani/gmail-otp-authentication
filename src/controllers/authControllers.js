const { default: isEmail } = require("validator/lib/isemail");
const { sendOTP } = require("../utils/sendOtp");
const { genOTP } = require("../utils/generateOtp");
const OtpModel = require("../model/otpModel");

module.exports.send_otp_post = async (req, res) => {
  const { email } = req.body;

  if (isEmail(email || "")) {
    // Generate otp
    const otp = genOTP();

    // Send OTP code to email
    const isSent = await sendOTP(email, otp);

    if (isSent) {
      OtpModel.create({ email, otp })
        .then((doc) => {
          res.status(200).json({
            message: `OTP was sent to your email. Please check ${email}`,
          });
          console.log(doc);
        })
        .catch((err) => {
          res.status(500).json({ message: "Something went wrong on server!" });
          console.error(err);
        });
    } else {
      res
        .status(500)
        .json({
          message: "We couldn't send OTP code to your email! Please try later!",
        });
    }
  } else {
    res.status(400).json({ message: `'${email}' email is not valid!` });
  }
};

module.exports.verify_otp_post = (req, res) => {
  res.send("Verify otp");
};
