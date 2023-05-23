const { User } = require("../models/user"),
  jwt = require("jsonwebtoken"),
  dotenv = require("dotenv"),
  bcrypt = require("bcrypt");

const BadRequestError = require("../errors/bad-request-error");

dotenv.config();

const signUp = async (req, res) => {
  const existingEmail = await User.findOne({ email: req.body.email });

  // Check if only email is reserved
  if (existingEmail != null) {
    throw new BadRequestError("This email is reserved!");
    // res.status(400).send("This email is reserved!");
  } else {
    // Add new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      age: req.body.age,
      major: req.body.major,
      role: req.body.role,
    });

    // Save the new user in the database
    newUser.save();

    res.status(200).send("User created.");
  }
};

const signIn = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user != null) {
    const matchedPassword = await bcrypt.compare(
      req.body.password,
      user.password,
      (err, result) => {
        if (err) {
          console.error(err);
        } else {
          if (result) {
            console.log("Password is valid.");

            // Generate JWT
            const userJwt = jwt.sign(
              {
                id: user.id,
                email: user.email,
                role: user.role,
              },
              process.env.JWT_KEY
            );

            // Store it on session object
            req.session = {
              jwt: userJwt,
            };

            console.log(req.session);

            res
              .status(200)
              .json({ _id: user._id, email: user.email, role: user.role });
          } else {
            console.log("Password is invalid.");
            res.status(400).send("Invalid password!");
          }
        }
      }
    );
  } else {
    res.status(400).send("Invalid email!");
  }
};

var saveSession = function (req, role) {
  req.session.role = role;
};

module.exports = {
  signUp,
  signIn,
};
