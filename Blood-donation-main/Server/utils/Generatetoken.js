import jwt from "jsonwebtoken";

const mySecretKey = process.env.JWT_SECRET;
const Generatedtoken = async (user_id, res) => {
  const token = jwt.sign({ user_id }, mySecretKey, { expiresIn: "15d" });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

}
export default Generatedtoken;