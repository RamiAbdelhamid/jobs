const express = require("express");
const router = express.Router();
 const updateJobStatus = require("../controller/UpdateJobStatus");  
 const deleteJob = require("../controller/DeleteJob"); 
       router.put("/updatejobstatus/:id", updateJobStatus);
       router.delete("/job/:id", deleteJob);
    
module.exports = router;    