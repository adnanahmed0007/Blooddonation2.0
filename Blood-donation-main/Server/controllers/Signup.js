import DonorUserexport from "../models/DonerRegistration.js";
import bcrypt from "bcrypt"
import sendotpuser from "../utils/SendOtp.js";
const Signupuser = async (req, res, next) => {
    try {
        const { name, email, phone, bloodGroup, age, password } = req.body;
        if (name && email && phone && bloodGroup && age && password) {
            const findexsistinguser = await DonorUserexport.findOne(
                {
                    $or: [{ email: email }, { phone: phone }]
                })
            if (findexsistinguser) {
                return res
                    .status(401)
                    .json({
                        message: "user already regsiter"

                    })
            }
            const hashedpassword = await bcrypt.hash(password, 15);
            const otpnumber = Math.random() * 10 * 10 * 10 * 10 * 10;
            const otpnuumerfloor = Math.floor(otpnumber);

            const newuser = new DonorUserexport({
                name: name.trim().toLowerCase(),
                email: email.trim().toLowerCase(),
                phone: phone,
                bloodGroup: bloodGroup.trim(),
                age: age,
                password: hashedpassword,
                otp: otpnuumerfloor,
                isVerified: false,

            })
            await sendotpuser(email, otpnuumerfloor);

            const saved = await newuser.save()


            console.log(saved)
            if (saved) {
                return res
                    .status(200)
                    .json({
                        message: "user register succefully",
                        newuser,
                    })
            }




        }
        else {
            return res
                .status(401)
                .json({
                    message: "all the credentials are required",
                })

        }

    }
    catch (e) {
        console.log(e)
        return res
            .status(401)
            .json({
                message: ` error occured ${e}`,
            })
    }
}
export default Signupuser