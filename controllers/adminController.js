const { User } = require("../models/user"),
  dotenv = require("dotenv");

dotenv.config();

const getAllApplicants = async (req, res) => {
  try {
    const existingApplicants = await User.find({ role: "applicant" });

    if (existingApplicants.length == 0) {
      res.status(400).send("No existing applicants to be shown!");
    } else {
      res.status(200).send(existingApplicants);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const getApplicant = async (req, res) => {
  try {
    const applicant = await User.findById(req.params.id);

    res.status(200).send(applicant);
    console.log("Success!");
    res.status(422).send("Invalid ID!");
  } catch (error) {
    console.log("Failed");
    res.status(422).send("Invalid ID!");
  }
};

const deleteAllApplicants = async (req, res) => {
  try {
    const existingApplicants = await User.find({ role: "applicant" });

    if (existingApplicants.length == 0) {
      res.status(400).send("No existing applicants to be deleted!");
    } else {
      await User.deleteMany({ role: "applicant" });

      if (existingApplicants.length == 1) {
        res.status(200).send(`Only one applicant deleted sucessfully.`);
      } else {
        res
          .status(200)
          .send(
            `There are ${existingApplicants.length} applicants deleted sucessfully.`
          );
      }
    }
  } catch {
    res.status(400).send(error);
  }
};

const deleteApplicant = async (req, res) => {
  try {
    const applicant = await User.findById(req.params.id);

    if (applicant.role === "admin") {
      res.status(400).send("Cannot delete an admin!");
    } else {
      const applicantName = applicant.name;

      await User.deleteOne(applicant);
      res.status(200).send(`${applicantName} was deleted successfully.`);
    }
  } catch (error) {
    res.status(422).send("Invalid ID!");
  }
};

module.exports = {
  getAllApplicants,
  getApplicant,
  deleteApplicant,
  deleteAllApplicants,
};
