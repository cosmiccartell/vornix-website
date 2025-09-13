import express from 'express';
import Challenge from '../models/Challenge.js';
import StockAccount from '../models/StockAccount.js';
import DiscountCode from '../models/DiscountCode.js';
import User from '../models/User.js'; // We need this to count users
import TraderChallenge from '../models/TraderChallenge.js'; // We need this to count active challenges
import challengeBlueprints from '../config/challengeBlueprints.js';

const router = express.Router();

// --- NEW: FIRM OVERVIEW STATS ---
router.get('/overview-stats', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeChallenges = await TraderChallenge.countDocuments({ status: 'active' });
        const passedChallenges = await TraderChallenge.countDocuments({ status: 'passed' });
        const failedChallenges = await TraderChallenge.countDocuments({ status: 'failed' });
        const availableStockAccounts = await StockAccount.countDocuments({ status: 'available' });
        const assignedStockAccounts = await StockAccount.countDocuments({ status: 'assigned' });

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                activeChallenges,
                passedChallenges,
                failedChallenges,
                availableStockAccounts,
                assignedStockAccounts,
                // In the future, we will calculate revenue here
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching overview stats.' });
    }
});


// --- ONE-TIME SETUP ROUTE ---
router.get('/seed-challenges', async (req, res) => {
    try {
        await Challenge.deleteMany({});
        await Challenge.insertMany(challengeBlueprints);
        res.status(200).send('Challenge blueprints have been successfully seeded!');
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
        res.status(500).json({ success: false, message: 'Error adding stock account.' });
    }
});

// UPGRADED: This now includes the user's email for assigned accounts
router.get('/stock-accounts', async (req, res) => {
    try {
        // .populate() is like a VLOOKUP in Excel. It finds the user's email.
        const stockAccounts = await StockAccount.find({}).populate('assignedToUser', 'email name');
        res.status(200).json({ success: true, data: stockAccounts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching accounts.' });
    }
});


// --- DISCOUNT CODE MANAGEMENT ---
// (We will build the form for this in a later step)
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
