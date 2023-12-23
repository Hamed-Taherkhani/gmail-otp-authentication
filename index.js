require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./src/routes/authRoute");
const { limiter } = require("./src/lib/express-rate-limit");

const app = express();

// Setup middlewares :
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Add routers :
app.use("/user/login", limiter, authRoute);

// Try to connect mongodb
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("✅ Successfully connected to mongodb.");

    // Run server
    app.listen(
      process.env.PORT,
      console.log(
        `✅ Server is listening for requests on ${process.env.PORT} port`
      )
    );
  })
  .catch((err) => console.error(`❌ Couldn't connect to mongodb\n`, err));
