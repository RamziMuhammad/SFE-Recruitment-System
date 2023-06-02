const express = require("express"),
  applicantRouter = express.Router();

const fileUpload = require("express-fileupload");

const path = require("path");
const directoryPath = path.dirname(require.main.filename);
applicantRouter.use(express.static(path.join(directoryPath, "statics")));

const currentUser = require("../middlewares/current-user"),
  requireAuth = require("../middlewares/require-auth");
const filesPayloadExists = require("../middlewares/filesPayloadExists"),
  fileExtLimiter = require("../middlewares/fileExtLimiter"),
  fileSizeLimiter = require("../middlewares/fileSizeLimiter");

const {
  getMyInfo,
  uploadVideo,
} = require("../controllers/applicantController");

applicantRouter.get("/upload-video/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/uploadVideo.html"));
});

applicantRouter.get("/get-my-info", currentUser, requireAuth, getMyInfo);

applicantRouter.post(
  "/upload-video",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".mp4", ".mov", ".wmv"]),
  fileSizeLimiter,
  uploadVideo
);

module.exports = {
  applicantRouter,
};
