const { sign } = require("jsonwebtoken");

const genSessionToken = (payload) => {
  return sign(
    { ...payload, random: Math.random() * 20000 },
    process.env.JWT_SECRETE_KYE,
    { expiresIn: Number(process.env.JWT_EXPIRE_TIME_SECONDS) }
  );
};

module.exports = {
  genSessionToken,
};
