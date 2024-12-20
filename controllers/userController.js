import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

//login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//sign up user
export const signupUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const user = await User.signup(email, password, username);

    const token = createToken(user._id);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
