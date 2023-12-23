const { Router } = require("express");
const authControllers = require("../controllers/authControllers");

const authRoute = Router();

authRoute.post("/send-otp", authControllers.send_otp_post);
authRoute.post("/verify-otp", authControllers.verify_otp_post);

module.exports = authRoute;
