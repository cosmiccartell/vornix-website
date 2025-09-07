import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { networkInterfaces } from "os"; // Import the os module using ES modules syntax

import sendEmail from "./utils/sendEmail.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// Middleware - Updated CORS configuration for network access
app.use(cors({
  origin: true, // Allow all origins (for development)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected: 127.0.0.1"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Vornix Backend API is running...");
});

// Auth API
app.use("/api/auth", authRoutes);

// Test Email Route
app.get("/api/test-email", async (req, res) => {
  try {
    await sendEmail(
      "someone@example.com",
      "Hello from Vornix 🚀",
      "This is a plain test email.",
      "<h2>Hello from <b>Vornix Prop Firm</b> 🚀</h2>"
    );
    res.json({ success: true, message: "✅ Test email sent! Check your inbox." });
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Function to get local IP address
function getLocalIP() {
  const interfaces = networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return '0.0.0.0';
}

// Start Server
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0'; // Listen on all network interfaces

app.listen(PORT, HOST, () => {
  console.log(`✅ Server running on http://${HOST}:${PORT}`);
  console.log(`✅ Local access: http://localhost:${PORT}`);
  
  // Only try to get local IP if not running on 0.0.0.0
  if (HOST === '0.0.0.0') {
    const localIP = getLocalIP();
    if (localIP !== '0.0.0.0') {
      console.log(`✅ Network access: http://${localIP}:${PORT}`);
    }
  }
});