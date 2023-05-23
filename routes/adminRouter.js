const { Router } = require("express"),
  { body } = require("express-validator"),
  adminRouter = Router();

const { isAuthorizedUser } = require("../middlewares/checkRole"),
  currentUser = require("../middlewares/current-user"),
  errorHandler = require("../middlewares/error-handler"),
  requireAuth = require("../middlewares/require-auth"),
  validateRequest = require("../middlewares/validate-request");

const {
  getAllApplicants,
  getApplicantById,
  deleteAllApplicants,
} = require("../controllers/adminController");

adminRouter.get(
  "/",
  currentUser,
  requireAuth,
  isAuthorizedUser("app"),
  getAllApplicants
);

adminRouter.get(
  "/:id",
  currentUser,
  requireAuth,
  isAuthorizedUser("admin"),
  getApplicantById
);

adminRouter.delete(
  "/delete-applicants/",
  currentUser,
  requireAuth,
  isAuthorizedUser("admin"),
  deleteAllApplicants
);

module.exports = {
  adminRouter,
};
