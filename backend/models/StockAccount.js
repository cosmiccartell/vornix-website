import mongoose from "mongoose";

const stockAccountSchema = new mongoose.Schema({
  // The login/account number from MetaTrader
  mt5Login: { type: String, required: true, unique: true }, 
  
  mt5Password: { type: String, required: true },
  mt5Server: { type: String, required: true },
  
  // e.g., 10000. This is the generic size of the demo account.
  accountSize: { type: Number, required: true }, 
  
  // The status of this specific demo account in your inventory
  status: {
    type: String,
    enum: ['available', 'assigned'],
    default: 'available',
  },
  
}, { timestamps: true });

const StockAccount = mongoose.model("StockAccount", stockAccountSchema);
export default StockAccount;
