const { Router } = require("express"),
  { body } = require("express-validator"),
  applicantRouter = Router();

const { isAuthorizedUser } = require("../middlewares/checkRole"),
  currentUser = require("../middlewares/current-user"),
  errorHandler = require("../middlewares/error-handler"),
  requireAuth = require("../middlewares/require-auth"),
  validateRequest = require("../middlewares/validate-request");

module.exports = {
  applicantRouter,
};
