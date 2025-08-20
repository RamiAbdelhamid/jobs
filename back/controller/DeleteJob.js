    const AddJob = require('../model/AddJob');
    const mongoose = require('mongoose');
    const DeleteJobController = async (req, res) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Job id is required' });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid job id format' });
        }

        try {
            const deleted = await AddJob.findByIdAndDelete(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Job not found' });
            }
            return res.status(200).json({ message: 'Job deleted successfully' });
        } catch (err) {
            return res.status(500).json({ message: err?.message || 'Internal Server Error' });
        }
    }
    module.exports = DeleteJobController;


