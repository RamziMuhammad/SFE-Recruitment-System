const { User } = require("../models/user"),
  jwt = require("jsonwebtoken");

const path = require("path");

const directoryPath = path.dirname(require.main.filename);

const spawn = require("child_process").spawn;
const vidoePath = "Ramzi";

const getMyInfo = async (req, res) => {
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY); // Extract info from json web token
    req.currentUser = payload;
    res.status(200).send({
      _id: payload._id,
      email: payload.email,
      age: payload.age,
      major: payload.major,
      role: payload.role,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

const uploadVideo = async (req, res) => {
  const files = req.files;

  Object.keys(files).forEach((key) => {
    const filepath = path.join(__dirname, "../Videos", files[key].name); // __dirname refers to node project directory
    files[key].mv(filepath, (err) => {
      if (err) return res.status(500).json({ status: "error", message: err }); // 500 status for server error
    });
  });

  const pythonProcess = spawn("python", [
    `${directoryPath}\\Recognition-Model.py`,
    vidoePath,
  ]);

  pythonProcess.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  console.log(`${Object.keys(files).toString()} Uploaded Successfully`);
  return res.json({
    status: "Success",
    message: `${Object.keys(files).toString()} Uploaded Successfully`,
  });
};

module.exports = { getMyInfo, uploadVideo };
