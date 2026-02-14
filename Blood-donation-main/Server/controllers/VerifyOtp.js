import DonorUserexport from "../models/DonerRegistration.js";
import Generatedtoken from "../utils/Generatetoken.js";

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;


        const user = await DonorUserexport.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }


        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }


        user.otp = 0;
        user.isVerified = true;

        await user.save();


        await Generatedtoken(user._id, res);

        return res.status(201).json({
            message: "OTP verified successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

export default verifyOtp;
