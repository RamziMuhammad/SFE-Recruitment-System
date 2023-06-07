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

adminRouter.get("/administration", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/administration.html"));
});

adminRouter.get(
  "/applicants",
  // currentUser,
  // requireAuth,
  // isAuthorizedUser(),
  getAllApplicants
);

adminRouter.get(
  "/applicant/:id",
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
  "/applicant/:id",
  currentUser,
  requireAuth,
  isAuthorizedUser(),
  deleteApplicant
);

module.exports = {
  adminRouter,
};
