import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["trader", "admin"],
      default: "trader",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User; // ✅ ESM export
