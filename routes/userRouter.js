const { Router } = require("express"),
  userRouter = Router(),
  { body } = require("express-validator");

const { signIn, signUp } = require("../controllers/userController");

const { isAuthorizedUser } = require("../middlewares/checkRole"),
  currentUser = require("../middlewares/current-user"),
  errorHandler = require("../middlewares/error-handler"),
  requireAuth = require("../middlewares/require-auth"),
  validateRequest = require("../middlewares/validate-request");

userRouter.post(
  "/signup/",
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
      .trim()
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
  "/signin/",
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
