const genOTP = () => {
  let OTP = "";
  for (let i = 0; i < 6; i++) OTP += String(Math.floor(Math.random() * 10));

  return OTP;
};

module.exports = {
  genOTP,
};
