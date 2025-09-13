import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },
  
  // We will store the discount code used, if any
  discountCode: { type: String, uppercase: true, trim: true },
  
  initialPrice: { type: Number, required: true },
  amountPaid: { type: Number, required: true },
  
  // This will store the invoice ID from your BTCPay server
  paymentGatewayInvoiceId: { type: String }, 
  
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
