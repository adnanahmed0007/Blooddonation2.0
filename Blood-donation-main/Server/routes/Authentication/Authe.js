import express from "express";
import Signupuser from "../../controllers/Signup.js";
import verifyOtp from "../../controllers/VerifyOtp.js";
import Login from "../../controllers/Login.js";
import Logout from "../../controllers/Logout.js";
import verifyJwt from "../../middleware/VerifyJwt.js";
const router = express.Router();
router.post("/signup", Signupuser);
router.post("/verifyotp", verifyOtp);
router.post("/login", verifyJwt, Login)
router.get("/logout", Logout)

export default router;
