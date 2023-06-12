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
    const newUser = await User.create(req.body);
    console.log("User created.");
    res.status(200).json({
      status: "Success",
      message: `User created.`,
    });
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
            console.log(`${user.name} signedin`);

            // Generate JWT
            const userJwt = jwt.sign(
              {
                _id: user._id,
                email: user.email,
                age: user.age,
                major: user.major,
                role: user.role,
              },
              process.env.JWT_KEY
            );

            // Store it on session object
            req.session = {
              jwt: userJwt,
            };

            res.status(200).json({
              status: "Success",
              message: `Signed in Successfully`,
              role: user.role,
            });
          } else {
            res.status(400).send("Invalid password!");
          }
        }
      }
    );
  } else {
    res.status(400).send("Invalid email!");
  }
};

const signOut = async (req, res) => {
  req.session = null;

  res.send({});
};

module.exports = {
  signUp,
  signIn,
  signOut,
};
