const jwt = require("jsonwebtoken");

const currentUser = require("./current-user");
const isAuthorizedUser = (role) => {
  return async (req, res, next) => {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY); // Extract info from json web token
    req.currentUser = payload;

    if (req.currentUser.role !== "admin") {
      return res.json({
        message: "Not Authorized!",
      });
    }

    next();
  };
};

module.exports = { isAuthorizedUser };
