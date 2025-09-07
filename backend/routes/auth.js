import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import PasswordReset from "../models/PasswordReset.js";
import OTP from "../models/OTP.js"; // We'll create this model
import sendEmail from "../utils/sendEmail.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ðŸ“Œ SEND OTP FOR REGISTRATION
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    // Save OTP to database
    await OTP.findOneAndUpdate(
      { email },
      { otp: otpCode, expiresAt: otpExpiry },
      { upsert: true, new: true }
    );

    // Send OTP email
    await sendEmail(
      email,
      "Your Vornix Verification Code",
      `Your OTP code is: ${otpCode}. It will expire in 10 minutes.`,
      `<h2>Your Vornix Verification Code</h2>
       <p>Your OTP code is: <strong>${otpCode}</strong></p>
       <p>This code will expire in 10 minutes.</p>`
    );

    res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ðŸ“Œ VERIFY OTP AND REGISTER
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp, password, name } = req.body;

    // Find OTP record
    const otpRecord = await OTP.findOne({ email });
    if (!otpRecord) {
      return res.status(400).json({ success: false, message: "OTP not found. Please request a new OTP." });
    }

    // Check if OTP is expired
    if (otpRecord.expiresAt < new Date()) {
      await OTP.deleteOne({ email });
      return res.status(400).json({ success: false, message: "OTP has expired. Please request a new OTP." });
    }

    // Verify OTP
    if (otpRecord.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP code." });
    }

    // OTP is valid, create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();

    // Delete OTP record after successful verification
    await OTP.deleteOne({ email });

    res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ðŸ“Œ LOGIN (keep your existing login code)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.json({
      success: true,
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ðŸ“Œ FORGOT PASSWORD (keep your existing code)
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const passwordReset = new PasswordReset({ userId: user._id, token: resetToken });
    await passwordReset.save();

    const resetURL = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

    await sendEmail(
      user.email,
      "Password Reset Request",
      `Click here to reset your password: ${resetURL}`,
      `<p>Click <a href="${resetURL}">here</a> to reset your password.</p>`
    );

    res.json({ success: true, message: "Reset email sent" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ðŸ“Œ RESET PASSWORD (keep your existing code)
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const resetEntry = await PasswordReset.findOne({ token });
    if (!resetEntry) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(resetEntry.userId, { password: hashedPassword });
    await PasswordReset.deleteOne({ _id: resetEntry._id });

    res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ðŸ“Œ GET PROFILE (keep your existing code)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

