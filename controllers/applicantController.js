const { User } = require("../models/user"),
  jwt = require("jsonwebtoken");

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

module.exports = { getMyInfo };
