import express from 'express';
import Challenge from '../models/Challenge.js';
import DiscountCode from '../models/DiscountCode.js';
import Order from '../models/Order.js';
import authMiddleware from '../middleware/authMiddleware.js';

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

// This engine part creates the invoice and prepares for payment
router.post('/create-invoice', authMiddleware, async (req, res) => {
    const { challengeId, discountCode } = req.body;
    const userId = req.user.id;

    try {
        const challenge = await Challenge.findById(challengeId);
        if (!challenge) return res.status(404).json({ success: false, message: 'Challenge not found.' });

        let finalPrice = challenge.priceUpfront || challenge.price;
        let appliedDiscountCode = null;

        if (discountCode) {
            const discount = await DiscountCode.findOne({ code: discountCode.toUpperCase(), isActive: true });
            if (discount) {
                const discountAmount = (finalPrice * discount.discountPercentage) / 100;
                finalPrice = finalPrice - discountAmount;
                appliedDiscountCode = discount.code;
            }
        }
        
        const newOrder = new Order({
            userId,
            challengeId,
            discountCode: appliedDiscountCode,
            initialPrice: challenge.priceUpfront || challenge.price,
            amountPaid: finalPrice,
            status: 'pending',
        });
        await newOrder.save();

        // --- BTCPay Server Integration (Simulation) ---
        const btcPayInvoiceId = `simulated_${newOrder._id}`;
        newOrder.paymentGatewayInvoiceId = btcPayInvoiceId;
        await newOrder.save();
        
        const redirectUrl = `https://testnet.demo.btcpayserver.org/i/${btcPayInvoiceId}`; // This is a demo link

        res.status(200).json({ success: true, redirectUrl });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error while creating invoice.' });
    }
});


export default router;
