    const AddJob = require('../model/AddJob');
    const AddJobController = (req, res) => {
        AddJob.create(req.body)
            .then((job) => {
                res.status(201).json(job);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    }
    
    module.exports = AddJobController;