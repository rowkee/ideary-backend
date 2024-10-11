import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

// static signup method
userSchema.statics.signup = async function (
  email,
  password,
  firstName,
  lastName,
  username
) {
  if (!email || !password || !firstName || !lastName || !username) {
    throw Error("All fields must be completed amigo.");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email address is not a valid.");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Use a stronger password.");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use.");
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    firstName,
    lastName,
    username,
  });

  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Email AND password required.");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("No user with this email address");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password.");
  }

  return user;
};

export default mongoose.model("User", userSchema);
