import jwt from "jsonwebtoken";
const mySecretKey = process.env.JWT_SECRET;
import DonorUserexport from "../models/DonerRegistration.js";
const verifyJwt = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res
                .status(404)
                .json({
                    message: "erroir occured no token found"
                })
        }
        const verify = jwt.verify(token, mySecretKey);



        if (!verify) {
            return res
                .status(401)
                .json({
                    message: 'token verifuvatruon failed',
                })
        }
        const finduser = await DonorUserexport.findById(verify.user_id);

        req.user = finduser;

        next();


    }
    catch (E) {
        console.log(E);
        return res
            .status(404)
            .json({
                message: `error occured ${E}`
            })
    }
}
export default verifyJwt;