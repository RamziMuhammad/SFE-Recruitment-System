const express = require("express"),
  userRouter = express.Router();

const { body } = require("express-validator");

const path = require("path");
const directoryPath = path.dirname(require.main.filename);
userRouter.use(express.static(path.join(directoryPath, "statics")));

const { signIn, signUp } = require("../controllers/userController");

const { isAuthorizedUser } = require("../middlewares/checkRole"),
  currentUser = require("../middlewares/current-user"),
  validateRequest = require("../middlewares/validate-request");

userRouter.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/home.html"));
});

userRouter.get("/registration/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/registration.html"));
});

userRouter.post(
  "/registration/signup/",
  [
    body("name")
      .notEmpty()
      .isString()
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Insert your name!"),

    body("email")
      .notEmpty()
      .withMessage("Email is required!")
      .isEmail()
      .withMessage("Email must be valid!"),

    body("password")
      .notEmpty()
      .withMessage("Password is required!")
      .trim() // Removes leading and trailing whitespace characters from a string.
      .matches(/[a-zA-Z]/)
      .withMessage("Password must contain at least one letter!")
      .isLength({ min: 5, max: 20 })
      .withMessage("Password must be between 5 and 20 characters!"),
  ],
  validateRequest,
  currentUser,
  isAuthorizedUser("admin"),
  signUp
);

userRouter.post(
  "/registration/signin/",
  [
    body("email")
      .notEmpty()
      .withMessage("E-Mail is required!")
      .isEmail()
      .withMessage("Ivalid email!"),

    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 5, max: 20 })
      .withMessage("Password must have in range (5 : 20) characters"),
  ],
  validateRequest,
  signIn
);

module.exports = {
  userRouter,
};
