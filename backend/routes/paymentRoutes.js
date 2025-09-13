import express from 'express';
import Challenge from '../models/Challenge.js';
import DiscountCode from '../models/DiscountCode.js';
import Order from '../models/Order.js';
import authMiddleware from '../middleware/authMiddleware.js'; // We need this to know who the user is
import mongoose from 'mongoose';

const router = express.Router();

// This engine part validates a discount code
router.post('/validate-discount', authMiddleware, async (req, res) => {
    const { code, challengeId } = req.body;
    if (!code || !challengeId) {
        return res.status(400).json({ success: false, message: 'Code and Challenge ID are required.' });
    }

    try {
        const discount = await DiscountCode.findOne({ code: code.toUpperCase(), isActive: true });
        if (!discount) {
            return res.status(404).json({ success: false, message: 'Invalid or inactive discount code.' });
        }
        
        // In the future, you could add more rules here (max uses, expiry date, etc.)

        const challenge = await Challenge.findById(challengeId);
        if (!challenge) {
            return res.status(404).json({ success: false, message: 'Challenge not found.' });
        }
        
        const originalPrice = challenge.priceUpfront || challenge.price;
        const discountAmount = (originalPrice * discount.discountPercentage) / 100;
        const finalPrice = originalPrice - discountAmount;

        res.status(200).json({ 
            success: true, 
            message: `Discount of ${discount.discountPercentage}% applied!`,
            finalPrice: finalPrice.toFixed(2) 
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error while validating code.' });
    }
});

// This engine part creates the invoice and redirects to the payment page
router.post('/create-invoice', authMiddleware, async (req, res) => {
    const { challengeId, discountCode } = req.body;
    const userId = req.user.id;

    try {
        const challenge = await Challenge.findById(challengeId);
        if (!challenge) return res.status(404).json({ success: false, message: 'Challenge not found.' });

        let finalPrice = challenge.priceUpfront || challenge.price;
        let appliedDiscountCode = null;

        // If a discount code was provided, re-validate it and apply it
        if (discountCode) {
            const discount = await DiscountCode.findOne({ code: discountCode.toUpperCase(), isActive: true });
            if (discount) {
                const discountAmount = (finalPrice * discount.discountPercentage) / 100;
                finalPrice = finalPrice - discountAmount;
                appliedDiscountCode = discount.code;
            }
        }
        
        // Create a new order record in our database
        const newOrder = new Order({
            userId,
            challengeId,
            discountCode: appliedDiscountCode,
            initialPrice: challenge.priceUpfront || challenge.price,
            amountPaid: finalPrice,
            status: 'pending',
        });
        await newOrder.save();

        // --- BTCPay Server Integration (The important part!) ---
        // In a real application, you would make an API call to your BTCPay server here.
        // That call would return a real invoice ID and a real redirect URL.
        // For now, we will simulate this process.
        
        const btcPayInvoiceId = `simulated_${newOrder._id}`;
        // We save the simulated invoice ID to our order
        newOrder.paymentGatewayInvoiceId = btcPayInvoiceId;
        await newOrder.save();
        
        // We create a simulated redirect URL
        const redirectUrl = `https://testnet.demo.btcpayserver.org/i/${btcPayInvoiceId}`; // This is just a demo link

        res.status(200).json({ success: true, redirectUrl });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error while creating invoice.' });
    }
});


export default router;
