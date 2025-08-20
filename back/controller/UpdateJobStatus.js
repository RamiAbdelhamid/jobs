    const AddJob = require('../model/AddJob');
    const mongoose = require('mongoose');
    const UpdateJobStatusController = async (req, res) => {
        // make status true or false
        const { status: rawStatus } = req.body;
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Job id is required' });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid job id format' });
        }

        const normalizedStatus = (rawStatus === true || rawStatus === 'true' || rawStatus === 1 || rawStatus === '1') ? 'true' : 'false';

        try {
            console.log('UpdateJobStatus request', { id, rawStatus, normalizedStatus });
            const job = await AddJob.findByIdAndUpdate(
                id,
                { status: normalizedStatus, updatedAt: Date.now() },
                { new: true, runValidators: true }
            );

            if (!job) {
                return res.status(404).json({ message: 'Job not found' });
            }

            return res.status(200).json(job);
        } catch (err) {
            console.error('UpdateJobStatus error', err);
            // Handle common mongoose errors explicitly
            if (err?.name === 'CastError') {
                return res.status(400).json({ message: 'Invalid data provided' });
            }
            if (err?.name === 'ValidationError') {
                return res.status(400).json({ message: err.message });
            }
            return res.status(500).json({ message: err?.message || 'Internal Server Error' });
        }
    }
    module.exports = UpdateJobStatusController; 
