const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  limit: 3,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  limiter,
};
