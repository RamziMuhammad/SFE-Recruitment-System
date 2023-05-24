const mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  Schema = mongoose.Schema,
  model = mongoose.model;

const userSchema = Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
    // unique: true,
    // match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  },
  password: {
    type: String,
    // required: true,
  },
  age: {
    type: Number,
    min: 18,
    max: 45,
  },
  major: {
    type: String,
  },
  role: {
    type: String,
    // enum: ["admin", "applicant"],
    default: "applicant",
  },
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = model("Users", userSchema);

module.exports = {
  User,
};
