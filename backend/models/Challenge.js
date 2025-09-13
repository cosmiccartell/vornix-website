import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
  // e.g., "Basic Challenge", "Standard Challenge"
  challengeType: { type: String, required: true }, 
  
  // e.g., 600, 2500, 10000
  accountSize: { type: Number, required: true }, 
  
  // The main fee for the challenge, e.g., 7, 25. For Flex, this is the TOTAL fee.
  price: { type: Number, required: true }, 
  
  // For Flex accounts, this is the upfront fee.
  priceUpfront: { type: Number }, 
  
  // For Flex accounts, this is the fee after passing.
  priceAfterPass: { type: Number }, 
  
  // e.g., 3 for 3-step, 2 for 2-step
  evaluationStages: { type: Number, required: true }, 
  
  // An array of numbers, e.g., [10, 8, 5] for the profit targets of each stage
  profitTargets: [{ type: Number }], 
  
  dailyDrawdown: { type: Number, required: true }, // e.g., 5 for 5%
  maxDrawdown: { type: Number, required: true }, // e.g., 10 for 10%
  
  timeLimitDays: { type: Number, default: null }, // null for Unlimited
  minTradingDays: { type: Number, default: 5 },
  isNewsTradingAllowed: { type: Boolean, default: false }, 
  profitSplit: { type: Number, required: true }, // e.g., 85 or 90
  
  // So you can enable/disable challenges from being sold
  isActive: { type: Boolean, default: true }, 

}, { timestamps: true });

const Challenge = mongoose.model("Challenge", challengeSchema);
export default Challenge;
