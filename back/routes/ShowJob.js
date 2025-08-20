const express = require("express");
const router = express.Router();
const ShowJobController = require("../controller/ShowJob");
router.get("/showjob", ShowJobController); 
    
module.exports = router;