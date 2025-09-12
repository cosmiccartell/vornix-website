import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import axios from "axios"; // The tool for the live lookup
import User from "../models/User.js";
import PasswordReset from "../models/PasswordReset.js";
import OTP from "../models/OTP.js";
import sendEmail from "../utils/sendEmail.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// This new "smart" function does a LIVE lookup for the Ngrok URL
async function getPublicUrl() {
  try {
    // It asks the running Ngrok program for its current public address
    const response = await axios.get("http://127.0.0.1:4040/api/tunnels");
    const httpsTunnel = response.data.tunnels.find(t => t.proto === 'https');
    if (httpsTunnel) {
      console.log(`✅ Live Ngrok URL found: ${httpsTunnel.public_url}`);
      return httpsTunnel.public_url;
    }
  } catch (error) {
    // This warning is helpful for local development
    console.warn("⚠️ Could not get Ngrok URL. Is Ngrok running? Using Render's URL as fallback.");
  }
  
  // For the LIVE website, we use the address set on Render. For local, it uses a default.
  return process.env.FRONTEND_URL || 'http://localhost:5173';
}


// --- FORGOT PASSWORD (This is the only section that has changed) ---
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    // Invalidate old tokens
    await PasswordReset.deleteMany({ userId: user._id });

    const resetToken = crypto.randomBytes(32).toString("hex");
    await PasswordReset.create({ userId: user._id, token: resetToken });

    // Step 1: Perform a LIVE lookup for the current URL
    const publicUrl = await getPublicUrl();
    
    // Step 2: Use that live URL to build the link
    const resetURL = `${publicUrl}/reset-password/${resetToken}`;

    await sendEmail(
      user.email,
      "Password Reset Request",
      `Click here to reset your password: ${resetURL}`,
      `<p>Click <a href="${resetURL}">here</a> to reset your password.</p>`
    );

    res.json({ success: true, message: "Reset email sent" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
});


// --- ALL OTHER SECTIONS ARE THE SAME AS YOUR ORIGINAL FILE ---

// Register (Send OTP)
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await OTP.findOneAndUpdate(
      { email }, { otp: otpCode, expiresAt: otpExpiry }, { upsert: true, new: true }
    );
    await sendEmail(
      email, "Your Vornix Verification Code", `Your OTP code is: ${otpCode}. It will expire in 10 minutes.`,
      `<h2>Your Vornix Verification Code</h2><p>Your OTP code is: <strong>${otpCode}</strong></p><p>This code will expire in 10 minutes.</p>`
    );
    res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// Register (Verify OTP)
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp, password, name } = req.body;
    const otpRecord = await OTP.findOne({ email });
    if (!otpRecord) return res.status(400).json({ success: false, message: "OTP not found. Please request a new OTP." });
    if (otpRecord.expiresAt < new Date()) {
      await OTP.deleteOne({ email });
      return res.status(400).json({ success: false, message: "OTP has expired. Please request a new OTP." });
    }
    if (otpRecord.otp !== otp) return res.status(400).json({ success: false, message: "Invalid OTP code." });
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email, password: hashedPassword, name });
    await newUser.save();
    await OTP.deleteOne({ email });
    res.json({ success: true, message: "User registered successfully" });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
    res.json({ success: true, token, user: { id: user._id, email: user.email, name: user.name }});
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// Reset Password
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const resetEntry = await PasswordReset.findOne({ token });
    if (!resetEntry) return res.status(400).json({ success: false, message: "Invalid or expired token" });
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.findByIdAndUpdate(resetEntry.userId, { password: hashedPassword });
    await PasswordReset.deleteMany({ userId: resetEntry.userId });
    res.json({ success: true, message: "Password reset successful" });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// Get Profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ success: true, user });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

export default router;
