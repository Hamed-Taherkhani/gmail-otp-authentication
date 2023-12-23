const { default: isEmail } = require("validator/lib/isemail");
const { sendOTP, isOTP, validateOTP } = require("../utils/otp");
const { genOTP } = require("../utils/generateOtp");
const OtpModel = require("../model/otpModel");
const { genSessionToken } = require("../lib/jsonwebtoken");

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
        })
        .catch((err) => {
          res.status(500).json({ message: "Something went wrong on server!" });
          console.error(err);
        });
    } else {
      res.status(500).json({
        message: "We couldn't send OTP code to your email! Please try later!",
      });
    }
  } else {
    res.status(400).json({ message: `'${email}' email is not valid!` });
  }
};

module.exports.verify_otp_post = async (req, res) => {
  /* 
    You can get user information like first name, last name,
    address and ... inside verify API and create new user if OTP valid
  */
  const { email, otp } = req.body;

  // If email and otp structure is valid
  if (isEmail(email) && isOTP(otp)) {
    // Try to find otp doc
    try {
      const doc = await OtpModel.findOne({ email });

      // If doc found
      if (doc) {
        if (await validateOTP(otp, doc.otp, doc.createdAt)) {
          const token = genSessionToken({ email: email });
          res.cookie("token", token, {
            maxAge: Number(process.env.JWT_EXPIRE_TIME_SECONDS) * 1000,
          });
          return res.status(200).send("Welcome to website.");
        } else {
          return res.status(400).send("OTP is deprecated or not correct!");
        }
      } else {
        return res
          .status(400)
          .send("Token deprecated! Please try to get new one.");
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send("Something went wrong on server!");
    }
  }
};
