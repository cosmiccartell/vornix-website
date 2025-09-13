import mongoose from "mongoose";

const traderChallengeSchema = new mongoose.Schema({
  // The trader who bought the challenge
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // The specific challenge product they bought (e.g., "$10k Standard")
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },
  
  // The specific MT5 account assigned to them from your stock
  stockAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'StockAccount', required: true },
  
  // The overall status of their attempt
  status: {
    type: String,
    enum: ['active', 'passed', 'failed', 'funded'],
    default: 'active',
  },
  
  currentStage: { type: Number, default: 1 },
  
  // This will store daily snapshots from the monitoring engine
  metricsHistory: [{
    date: Date,
    balance: Number,
    equity: Number,
    drawdown: Number,
  }],
  
  breaches: [{
      rule: String, // e.g., "daily_drawdown"
      value: Number,
      breachedAt: Date,
  }],

}, { timestamps: true });

const TraderChallenge = mongoose.model("TraderChallenge", traderChallengeSchema);
export default TraderChallenge;
