const mongoose = require("mongoose");
const { hash } = require("bcrypt");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: Number(process.env.OTP_EXPIRE_SECONDS),
    default: Date.now,
  },
});

otpSchema.pre("save", async function () {
  this.otp = await hash(this.otp, 10);
});

const OtpModel = mongoose.model("otp", otpSchema);

module.exports = OtpModel;
