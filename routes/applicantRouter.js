const { Router } = require("express"),
  applicantRouter = Router();

const fileUpload = require("express-fileupload");
const path = require("path");

const currentUser = require("../middlewares/current-user"),
  requireAuth = require("../middlewares/require-auth");
const filesPayloadExists = require("../middlewares/filesPayloadExists"),
  fileExtLimiter = require("../middlewares/fileExtLimiter"),
  fileSizeLimiter = require("../middlewares/fileSizeLimiter");

const {
  getMyInfo,
  uploadVideo,
} = require("../controllers/applicantController");

applicantRouter.get("/get-my-info", currentUser, requireAuth, getMyInfo);

applicantRouter.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/uploadVideo.html"));
});

applicantRouter.post(
  "/upload",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".mp4", ".mov", ".wmv"]),
  fileSizeLimiter,
  uploadVideo
);

module.exports = {
  applicantRouter,
};
