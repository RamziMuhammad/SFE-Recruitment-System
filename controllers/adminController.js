const { User } = require("../models/user"),
  dotenv = require("dotenv");

dotenv.config();

const getAllApplicants = async (req, res) => {
  try {
    const allApplicants = await User.find({});
    res.status(200).send(allApplicants);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getApplicantById = async (req, res) => {
  try {
    const applicant = await User.findById(req.params.id);
    res.status(200).send(applicant);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteApplicant = async (req, res) => {
  try {
    const course = await User.deleteOne({ _id: req.params.id });
    res.status(200).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteAllApplicants = async (req, res) => {
  const existingApplicants = await User.find({ role: "applicant" });

  if (existingApplicants.length == 0) {
    res.status(400).send("No existing users can be deleted!");
  } else {
    await User.deleteMany({ role: "applicant" });
    res
      .status(200)
      .send(
        `There are ${existingApplicants.length} users have been deleted sucessfully.`
      );
  }
};

module.exports = {
  getAllApplicants,
  getApplicantById,
  deleteApplicant,
  deleteAllApplicants,
};
