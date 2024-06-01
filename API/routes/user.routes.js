import express from "express";
import {
  loginUser,
  registerUser,
  getProfile,
  logoutUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// SECURE ROUTES

router.get("/profile", verifyJWT, getProfile);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
