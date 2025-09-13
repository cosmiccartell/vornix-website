import express from 'express';
import Challenge from '../models/Challenge.js';
import StockAccount from '../models/StockAccount.js';
// We will add the security guard later. For now, we are building.

const router = express.Router();

// --- CHALLENGE MANAGEMENT ---

// Create a New Challenge Blueprint
router.post('/challenges', async (req, res) => {
  try {
    const newChallenge = new Challenge(req.body);
    await newChallenge.save();
    res.status(201).json({ success: true, message: 'Challenge blueprint created successfully!', data: newChallenge });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating challenge blueprint.', error: error.message });
  }
});

// Get a List of All Challenge Blueprints
router.get('/challenges', async (req, res) => {
    try {
        const challenges = await Challenge.find({});
        res.status(200).json({ success: true, data: challenges });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching challenge blueprints.', error: error.message });
    }
});


// --- STOCK ACCOUNT INVENTORY MANAGEMENT ---

// Add a New MT5 Account to the Inventory
router.post('/stock-accounts', async (req, res) => {
    try {
        const newStockAccount = new StockAccount(req.body);
        await newStockAccount.save();
        res.status(201).json({ success: true, message: 'Stock account added to inventory!', data: newStockAccount });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding stock account.', error: error.message });
    }
});

// Get a List of All Stock Accounts in the Inventory
router.get('/stock-accounts', async (req, res) => {
    try {
        const stockAccounts = await StockAccount.find({});
        res.status(200).json({ success: true, data: stockAccounts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching stock accounts.', error: error.message });
    }
});

export default router;
