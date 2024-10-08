const express = require('express');
const router = express.Router();
const Participate = require('../models/participate');
const School = require('../models/School');

router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const participations = await Participate.find({ userId })
            .populate('schoolId') // Populate School data
            .exec();

        const schools = participations.map(p => p.schoolId);

        res.json(schools);
    } catch (error) {
        console.error('Error fetching schools:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
