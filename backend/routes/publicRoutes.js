import express from 'express';
import Challenge from '../models/Challenge.js';
import mongoose from 'mongoose'; // We need this for checking the ID format

const router = express.Router();

// This is the department you already have: it gets ALL challenges.
router.get('/challenges', async (req, res) => {
    try {
        const challenges = await Challenge.find({ isActive: true }).sort({ accountSize: 1 });
        res.status(200).json({ success: true, data: challenges });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching challenges' });
    }
});

// --- THIS IS THE NEW UPGRADE ---
// This new department handles requests for ONE SPECIFIC challenge by its ID.
// This is what your Checkout page needs.
router.get('/challenges/:id', async (req, res) => {
    try {
        // First, we check if the ID from the URL is a valid database ID format
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ success: false, message: 'Challenge not found (Invalid ID format)' });
        }

        const challenge = await Challenge.findById(req.params.id);

        if (!challenge) {
            return res.status(404).json({ success: false, message: 'Challenge not found in database' });
        }
        
        res.status(200).json({ success: true, data: challenge });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error fetching challenge details' });
    }
});
// --- END OF UPGRADE ---

export default router;
