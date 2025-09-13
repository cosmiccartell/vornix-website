import express from 'express';
import Challenge from '../models/Challenge.js';
import mongoose from 'mongoose'; // We need this for checking the ID

const router = express.Router();

// This engine fetches ALL Challenge Blueprints that are marked as "isActive"
router.get('/challenges', async (req, res) => {
    try {
        const challenges = await Challenge.find({ isActive: true }).sort({ accountSize: 1 });
        res.status(200).json({ success: true, data: challenges });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching challenges' });
    }
});

// --- THIS IS THE NEW UPGRADE ---
// This new engine part fetches ONE SPECIFIC Challenge Blueprint by its ID.
// This is what your Checkout page needs.
router.get('/challenges/:id', async (req, res) => {
    try {
        // First, we check if the ID from the URL is a valid database ID format
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ success: false, message: 'Challenge not found' });
        }

        const challenge = await Challenge.findById(req.params.id);

        if (!challenge) {
            return res.status(404).json({ success: false, message: 'Challenge not found' });
        }
        
        res.status(200).json({ success: true, data: challenge });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching challenge details' });
    }
});
// --- END OF UPGRADE ---

export default router;
