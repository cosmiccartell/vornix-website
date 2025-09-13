import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { networkInterfaces } from "os";
import sendEmail from "./utils/sendEmail.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from './routes/adminRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();
const app = express();

// --- THE FINAL CORS FIX ---
// This is the "security guard" for your backend.
// We are now giving it an explicit guest list.
const allowedOrigins = [
  'https://vornix-website.vercel.app', // Your live frontend
  'http://localhost:5173'             // Your local PC for testing
];

app.use(cors({
  origin: function (origin, callback) {
    // If the visitor is on our guest list (or is not a browser), let them in.
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // If they are not on the list, block them.
      callback(new Error('This visitor is not allowed.'));
    }
  },
  credentials: true,
}));
// --- END OF FIX ---


app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Vornix Backend API is running...");
});

// Auth API
app.use("/api/auth", authRoutes);

// Admin API
app.use('/api/admin', adminRoutes);

// Payment API
app.use('/api/payment', paymentRoutes);

// Public API (for fetching challenges, etc.)
app.use('/api/public', publicRoutes);

// Test Email Route
app.get("/api/test-email", async (req, res) => {
  try {
    await sendEmail(
      "someone@example.com", "Hello from Vornix 🚀", "This is a plain test email.",
      "<h2>Hello from <b>Vornix Prop Firm</b> 🚀</h2>"
    );
    res.json({ success: true, message: "✅ Test email sent! Check your inbox." });
  } catch (error) {
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
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`✅ Server running on http://${HOST}:${PORT}`);
  console.log(`✅ Local access: http://localhost:${PORT}`);
  if (HOST === '0.0.0.0') {
    const localIP = getLocalIP();
    if (localIP !== '0.0.0.0') {
      console.log(`✅ Network access: http://${localIP}:${PORT}`);
    }
  }
});
