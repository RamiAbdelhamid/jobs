    const AddJob = require('../model/AddJob');
    const ShowJobController = async (req, res) => {
        try {
            const { status } = req.query;
            let query = {};
            if (status === 'true' || status === 'false') {
                query.status = status;
            }
            const jobs = await AddJob.find(query).sort({ createdAt: -1 });
            res.status(200).json(jobs);
        } catch (err) {
            res.status(500).json({ message: err?.message || 'Internal Server Error' });
        }
    }
    module.exports = ShowJobController; 