const express = require("express"),
  adminRouter = express.Router();

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
  "/:id",
  currentUser,
  requireAuth,
  isAuthorizedUser(),
  getApplicant
);

adminRouter.get(
  "/",
  currentUser,
  requireAuth,
  isAuthorizedUser(),
  getAllApplicants
);

adminRouter.delete(
  "/:id",
  currentUser,
  requireAuth,
  isAuthorizedUser(),
  deleteApplicant
);

adminRouter.delete(
  "/",
  currentUser,
  requireAuth,
  isAuthorizedUser(),
  deleteAllApplicants
);

module.exports = {
  adminRouter,
};
