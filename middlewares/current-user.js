const jwt = require("jsonwebtoken");

const currentUser = (req, res, next) => {
  // ? conditional if req.session || req.session.jwt
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY); // Extract info from json web token
    req.currentUser = payload;
  } catch (err) {}
  next();
};

module.exports = currentUser;
