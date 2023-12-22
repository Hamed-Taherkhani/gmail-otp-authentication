require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Setup middlewares :
app.use(helmet());
app.use(morgan("dev"));

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
