const express = require("express");
const router = express.Router();
const accountSettingsController = require("../controllers/accountSettingsController");


router.post("/general_info",accountSettingsController.changeGeneral);

module.exports = router;