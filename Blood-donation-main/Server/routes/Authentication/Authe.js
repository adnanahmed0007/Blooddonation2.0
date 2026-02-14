import express from "express";
import Signupuser from "../../controllers/Signup.js";
import verifyOtp from "../../controllers/VerifyOtp.js";
import Login from "../../controllers/Login.js";
const router = express.Router();
router.post("/signup", Signupuser);
router.post("/verifyotp", verifyOtp);
router.post("/login", Login)

export default router;
