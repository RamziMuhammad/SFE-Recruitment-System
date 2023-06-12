const { User } = require("../models/user"),
  jwt = require("jsonwebtoken");
const path = require("path");
const directoryPath = path.dirname(require.main.filename);
const spawn = require("child_process").spawn;

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
    const filepath = path.join(__dirname, "../videos", files[key].name); // __dirname refers to node project directory
    vidoePath = `${directoryPath}/videos/${files[key].name}`;
    files[key].mv(filepath, (err) => {
      if (err) return res.status(500).json({ status: "error", message: err }); // 500 status for server error
    });
  });

  console.log(`${Object.keys(files).toString()} Uploaded Successfully`);

  const pythonProcess = spawn("python", [
    `${directoryPath}/ML/Traits-Prediction.py`,
    directoryPath,
    vidoePath, // The video name
  ]);
  try {
    let pythonOutput = "";
    pythonProcess.stdout.on("data", (data) => {
      console.log(String(data));
      pythonOutput += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        console.log("It's the completion of the Python script.");

        const regex = /(\w+)\sValue:\s(\d+\.?\d*)/g;
        const matches = pythonOutput.matchAll(regex);
        const values = {};
        for (const match of matches) {
          const [, trait, value] = match;
          values[trait.toLowerCase()] = parseFloat(value);
        }

        // Send the variable values as a response
        return res.json({
          extraversion: values["extraversion"],
          agreeableness: values["agreeableness"],
          conscientiousness: values["conscientiousness"],
          neuroticism: values["neuroticism"],
          openness: values["openness"],
          status: "Success",
        });
      } else {
        console.error("Python script execution failed");
        return res.status(500).json({
          status: "error",
          message: "Python script execution failed",
        });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ status: "error", message: error });
  }
};

module.exports = { getMyInfo, uploadVideo };
