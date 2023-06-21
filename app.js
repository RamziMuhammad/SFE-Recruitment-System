const express = require("express");
require("express-async-errors");

const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const cors = require("cors");

const errorHandler = require("./middlewares/error-handler");
const NotFoundError = require("./errors/not-found-error");

const app = express();
const path = require("path");

app.use(express.json());

app.use(cookieParser());
app.use(
  cookieSession({
    name: "sessionIdCookie",
    secret: "thisshouldbeasecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: true, // Cookie is only accessible over HTTP, requires HTTPS
    },
  })
);

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

const { userRouter } = require("./routes/userRouter");
const { adminRouter } = require("./routes/adminRouter");
const { applicantRouter } = require("./routes/applicantRouter");

app.use("/sfe-rs/", userRouter);
app.use("/sfe-rs/admin/", adminRouter);
app.use("/sfe-rs/applicant/", applicantRouter);

// app.all("*", async (req, res) => {
//   throw new NotFoundError();
// });

module.exports = {
  app,
};
