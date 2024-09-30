import express from "express";

//controller functions
import { signupUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// login
router.post("/login", loginUser);

// signup
router.post("/signup", signupUser);

export default router;
