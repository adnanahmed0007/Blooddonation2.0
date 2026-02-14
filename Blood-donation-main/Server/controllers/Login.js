
 import bcrypt from "bcrypt"
import DonorUserexport from "../models/DonerRegistration.js";
 import sendotpuser from "../utils/SendOtp.js";
const Login=async(req,res,next)=>
{
    try
    {
     const {email,password}=req.body;
     if(email&&password)
     {
         const existsinguser=await DonorUserexport.findOne({email});
        
         if(!existsinguser)
         {
            return res
            .status(404)
            .json({
                message:"the user is not register",

            })
         }
         const compare_password=await bcrypt.compare(password,existsinguser.password);
         if(!compare_password)
         {
            return res
            .status(404)
            .json({
                message:"password is incorrect"
            })
         }
         const optrandom=Math.random()*10*10*10*10*10;
   
         const otp=Math.floor(optrandom);
         await sendotpuser(email,otp);
            
       
         existsinguser.otp=otp;
         existsinguser.isVerified=false;
       await existsinguser.save();
      await sendotpuser(existsinguser.email,otp)
         return res
         .status(200)
         .json({
            message: `OTP has been sent to ${existsinguser.email}. Please verify.`,
        email: existsinguser.email,
         })

          


         
         

     }
else{
    return res
    .status(401)
    .json({
        message:" fill all the credentials"
    })
}
    }catch(e)
    {
        console.log(e);
        return res
        .status(404)
        .json({
            message:`error occured ${e}`,
        })
    }
}
export default Login