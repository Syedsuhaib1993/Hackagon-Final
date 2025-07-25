import dotenv from "dotenv";
import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

dotenv.config();
export const Signup = async (req, res) => {
  try {
    const { name, email, password, image, number } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashpass = await bcrypt.hash(password, 10);
    const otp = Math.floor(1000 + Math.random() * 9000);
    // const transporter = nodemailer.createTransport({
    //   service: "Gmail",
    //   auth: {
    //     user: "syedsuhaibhussani@gmail.com",
    //     pass: "rfrochzexzatzphs",
    //   },
    //   tls: {
    //     rejectUnauthorized: false,
    //   },
    // });
    // const mailOptions = {
    //   from: "syedsuhaibhussani@gmail.com",
    //   to: email,
    //   subject: "Verify your email",
    //   text: `Your OTP is ${otp}`,
    // };
    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     return res.status(400).json({ message: "Error sending email" });
    //   }
    // });

    const user = new User({
      name,
      email,
      password: hashpass,
      image,
      number,
      otp,
    });
    await user.save();
        // NODEMAILER
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "syedsuhaibhussani@gmail.com",
        pass: "rfrochzexzatzphs",
      },
      tls: {
    rejectUnauthorized: false,
  },
    });
const mailOption = {
  from: "syedsuhaibhussani@gmail.com",
  to: email,
  subject: "Welcome to LoanBank - Verify Your Account",
  html: `
    <div style="
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: auto;
      padding: 40px 20px;
      border-radius: 10px;
      background: linear-gradient(135deg, #15A08D 0%, #0D1A3D 100%);
      color: #ffffff;
    ">
      <h2 style="color: #ffffff; font-size: 28px; margin-bottom: 10px;">
        Welcome to <span style="color: #FFD700;">LoanBank</span>
      </h2>
      <p style="font-size: 16px; line-height: 1.6;">
        Thank you for signing up with LoanBank! We’re excited to help you manage your finances better.
      </p>
      <p style="font-size: 16px; margin: 20px 0;">
        Use the OTP below to verify your account:
      </p>
      <h1 style="
        background: #FFD700;
        color: #0D1A3D;
        display: inline-block;
        padding: 12px 24px;
        border-radius: 8px;
        letter-spacing: 6px;
        font-size: 32px;
      ">
        ${otp}
      </h1>
      <p style="font-size: 14px; margin-top: 30px; line-height: 1.5;">
        This OTP is valid for the next 10 minutes. If you didn’t request this, you can safely ignore this email.
      </p>
      <p style="font-size: 14px; margin-top: 20px;">
        Best regards,<br/>
        The LoanBank Team
      </p>
    </div>
  `,
};

    await transporter.sendMail(mailOption);
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error signing up user", error: error.message });
  }
};

export const Verifyotp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.otp == otp) {
      user.isactive = true;
      await user.save();
      return res
        .status(200)
        .json({ message: "OTP verified successfully", data: user });
    }

  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error verifying otp", error: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    if (!user.isactive) {
      return res.status(400).json({ message: "Verify your OTP through Email" });
    }
    const token = await jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ message: "User logged in successfully", token,user});
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in user", error: error.message });
  }
};
