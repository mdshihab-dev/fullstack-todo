const userModel = require("../../model/userModel")
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;
    let userExist = await userModel.findOne({ email });
    if (!userExist) return res.status(400).json({ error: "User not found" });

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    let resetToken = jwt.sign(
      { id: userExist.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15min" }
    );
    let resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userExist.email,
      subject: "Reset Password",
      html: `<h3>Please <a href=${resetLink}> click here </a> to Reset Password</h3>`,
    });
    res.send({ message: "Please check email for reset password!" });
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = forgotPasswordController
