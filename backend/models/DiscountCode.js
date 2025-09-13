import mongoose from "mongoose";

const discountCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true }, // e.g., VORNIX10
  discountPercentage: { type: Number, required: true }, // e.g., 10 for 10%
  isActive: { type: Boolean, default: true },
  uses: { type: Number, default: 0 },
  maxUses: { type: Number, default: null }, // null for unlimited
  expiresAt: { type: Date, default: null }, // null for no expiry
}, { timestamps: true });

const DiscountCode = mongoose.model("DiscountCode", discountCodeSchema);
export default DiscountCode;
