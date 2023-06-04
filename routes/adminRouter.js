const express = require("express"),
  adminRouter = express.Router();
const { User } = require("../models/user");

const path = require("path");
const directoryPath = path.dirname(require.main.filename);
adminRouter.use(express.static(path.join(directoryPath, "statics")));

const { isAuthorizedUser } = require("../middlewares/checkRole"),
  currentUser = require("../middlewares/current-user"),
  requireAuth = require("../middlewares/require-auth");

const {
  getAllApplicants,
  getApplicant,
  deleteAllApplicants,
  deleteApplicant,
} = require("../controllers/adminController");

adminRouter.get(
  "/applicants",
  currentUser,
  requireAuth,
  isAuthorizedUser(),
  getAllApplicants
);

adminRouter.get(
  "/applicants/:id",
  currentUser,
  requireAuth,
  isAuthorizedUser(),
  getApplicant
);

adminRouter.delete(
  "/applicants",
  currentUser,
  requireAuth,
  isAuthorizedUser(),
  deleteAllApplicants
);

adminRouter.delete(
  "/applicants/:id",
  currentUser,
  requireAuth,
  isAuthorizedUser(),
  deleteApplicant
);

module.exports = {
  adminRouter,
};
