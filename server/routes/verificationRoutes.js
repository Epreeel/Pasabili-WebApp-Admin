const express = require("express");
const router = express.Router();
const verifcationController = require("../controllers/verificationController");


router.get("/",verifcationController.getAllVerifications);
router.post("/verify",verifcationController.verifyCustomer);



module.exports = router;