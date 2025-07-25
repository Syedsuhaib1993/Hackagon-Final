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
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "syedsuhaibhussani@gmail.com",
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: "syedsuhaibhussani@gmail.com",
      to: email,
      subject: "Verify your email",
      text: `Your OTP is ${otp}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(400).json({ message: "Error sending email" });
      }
    });

    const user = new User({
      name,
      email,
      password: hashpass,
      image,
      number,
      otp,
    });
    await user.save();
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
