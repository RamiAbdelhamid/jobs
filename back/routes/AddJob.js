    const express = require("express");
    const router = express.Router();
    const AddJobController = require("../controller/AddJob");
    router.post("/addjob", AddJobController);   
    
module.exports = router;
