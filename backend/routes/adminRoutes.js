import express from 'express';
import Challenge from '../models/Challenge.js';
import StockAccount from '../models/StockAccount.js';
import DiscountCode from '../models/DiscountCode.js'; // Import our new model
import challengeBlueprints from '../config/challengeBlueprints.js'; // Import the blueprints

const router = express.Router();

// --- ONE-TIME SETUP ROUTE ---
// You will visit this URL ONCE to automatically create all your products.
router.get('/seed-challenges', async (req, res) => {
    try {
        // First, delete any old challenge blueprints to avoid duplicates
        await Challenge.deleteMany({});
        // Then, insert all the new ones from our blueprints file
        await Challenge.insertMany(challengeBlueprints);
        res.status(200).send('Challenge blueprints have been successfully seeded to the database!');
    } catch (error) {
        res.status(500).send(`Error seeding challenges: ${error.message}`);
    }
});


// --- STOCK ACCOUNT INVENTORY MANAGEMENT ---
router.post('/stock-accounts', async (req, res) => {
    try {
        const newStockAccount = new StockAccount(req.body);
        await newStockAccount.save();
        res.status(201).json({ success: true, message: 'Stock account added!', data: newStockAccount });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding stock account.', error: error.message });
    }
});

router.get('/stock-accounts', async (req, res) => {
    try {
        const stockAccounts = await StockAccount.find({}).populate('assignedToUser', 'email');
        res.status(200).json({ success: true, data: stockAccounts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching accounts.' });
    }
});


// --- DISCOUNT CODE MANAGEMENT ---
router.post('/discount-codes', async (req, res) => {
    try {
        const newDiscountCode = new DiscountCode(req.body);
        await newDiscountCode.save();
        res.status(201).json({ success: true, message: 'Discount code created!', data: newDiscountCode });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating code.' });
    }
});

router.get('/discount-codes', async (req, res) => {
    try {
        const discountCodes = await DiscountCode.find({});
        res.status(200).json({ success: true, data: discountCodes });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching codes.' });
    }
});

export default router;
