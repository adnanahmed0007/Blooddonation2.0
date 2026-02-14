import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const sendotpuser = async (email, otpnuumerfloor) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email.trim(),
      subject: "OTP Verification",
      html: `
        <div style="font-family: Arial;">
          <h2>Your OTP Code</h2>
          <h1 style="color:blue;">${otpnuumerfloor}</h1>
          <p>This OTP is valid for 5 minutes.</p>
        </div>
      `
    });

    console.log("Email sent:", info.messageId);

  } catch (error) {
    console.log("Email error:", error.message);
  }
}

export default sendotpuser;
