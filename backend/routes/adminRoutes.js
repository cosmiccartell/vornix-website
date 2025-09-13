import express from 'express';
import Challenge from '../models/Challenge.js';
import StockAccount from '../models/StockAccount.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// This is a simple "security guard" middleware.
// It checks if the user is logged in AND has the 'admin' role.
const isAdmin = (req, res, next) => {
  // We will get the user info from the token after they log in
  // For now, this is a placeholder. We will complete this in a later step.
  // For today, we are just building the engine.
  next(); // For now, let's allow access to build.
};


// --- ENGINE PART 1: Create a New Challenge Program ---
// This will be the logic for the "Add New Challenge" form in your Admin Panel.
router.post('/challenges', isAdmin, async (req, res) => {
  try {
    const {
      challengeType,
      accountSize,
      price,
      priceUpfront,
      priceAfterPass,
      evaluationStages,
      profitTargets,
      dailyDrawdown,
      maxDrawdown,
      timeLimitDays,
      minTradingDays,
      isNewsTradingAllowed,
      profitSplit
    } = req.body;

    const newChallenge = new Challenge({
      challengeType,
      accountSize,
      price,
      priceUpfront,
      priceAfterPass,
      evaluationStages,
      profitTargets,
      dailyDrawdown,
      maxDrawdown,
      timeLimitDays,
      minTradingDays,
      isNewsTradingAllowed,
      profitSplit,
    });

    await newChallenge.save();
    res.status(201).json({ success: true, message: 'Challenge created successfully', data: newChallenge });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating challenge', error: error.message });
  }
});


// --- ENGINE PART 2: Get a List of All Challenge Programs ---
// This will be used to display all your challenges on your website and in the Admin Panel.
router.get('/challenges', async (req, res) => {
    try {
        // We find all challenges that you have marked as 'active'
        const challenges = await Challenge.find({ isActive: true });
        res.status(200).json({ success: true, data: challenges });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching challenges', error: error.message });
    }
});


export default router;
