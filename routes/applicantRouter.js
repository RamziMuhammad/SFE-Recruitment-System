const { Router } = require("express"),
  { body } = require("express-validator"),
  applicantRouter = Router();

const fileUpload = require("express-fileupload");
const path = require("path");

const directoryPath = path.dirname(require.main.filename);

// const { PythonShell } = require("python-shell");

// const options = {
//   // pythonPath: "C:/Users/Lenovo/anaconda3", // Optional. If not provided, the system's default Python will be used.
//   pythonOptions: ["-u"], // Unbuffered mode.
//   scriptPath: directoryPath,
//   args: ["Ramzi", 13], // Optional. Command-line arguments to pass to the Python script.
// };

const spawn = require("child_process").spawn;
const vidoePath = "Ramzi";

const { isAuthorizedUser } = require("../middlewares/checkRole"),
  currentUser = require("../middlewares/current-user"),
  errorHandler = require("../middlewares/error-handler"),
  requireAuth = require("../middlewares/require-auth"),
  validateRequest = require("../middlewares/validate-request");

const filesPayloadExists = require("../middlewares/filesPayloadExists"),
  fileExtLimiter = require("../middlewares/fileExtLimiter"),
  fileSizeLimiter = require("../middlewares/fileSizeLimiter");

const { getMyInfo } = require("../controllers/applicantController");

applicantRouter.get("/get-my-info", currentUser, requireAuth, getMyInfo);

applicantRouter.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

applicantRouter.post(
  "/upload",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".mp4", ".mov", ".wmv"]),
  fileSizeLimiter,
  async (req, res) => {
    const files = req.files;
    // console.log(files);

    Object.keys(files).forEach((key) => {
      const filepath = path.join(__dirname, "../Videos", files[key].name); // __dirname refers to node project directory
      files[key].mv(filepath, (err) => {
        if (err) return res.status(500).json({ status: "error", message: err }); // 500 status for server error
      });
    });

    // PythonShell.run("check.py", options, function (err, result) {
    //   if (err) throw err;
    //   console.log("Python script executed successfully.");
    //   console.log("Result:", result);
    // });

    const pythonProcess = spawn("python", [
      `${directoryPath}\\Recognition-Model.py`,
      "Ramzi",
    ]);

    pythonProcess.stdout.on("data", (data) => {
      console.log(data.toString());
    });

    console.log(`${Object.keys(files).toString()} Uploaded Successfully`);
    return res.json({
      status: "Success",
      message: `${Object.keys(files).toString()} Uploaded Successfully`,
    });
  }
);

module.exports = {
  applicantRouter,
};
