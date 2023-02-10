const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const linkRouter = require("./routes/link");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/login", authRouter);
app.use("/link", linkRouter);
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    // error: {
    //   message: error.message,
    // },
    error: true,
    message: error.message,
  });
});
mongoose.set("strictQuery", true);
mongoose.connect(
  process.env.MONGO_URI || "mongodb://localhost:27017/short-url",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

module.exports = app;
