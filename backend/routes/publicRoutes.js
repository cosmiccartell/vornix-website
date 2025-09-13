import express from 'express';
import Challenge from '../models/Challenge.js';

const router = express.Router();

// This engine fetches all Challenge Blueprints that are marked as "isActive"
router.get('/challenges', async (req, res) => {
    try {
        const challenges = await Challenge.find({ isActive: true }).sort({ accountSize: 1 });
        res.status(200).json({ success: true, data: challenges });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching challenges', error: error.message });
    }
});

export default router;
