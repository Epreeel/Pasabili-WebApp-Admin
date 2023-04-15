const express = require("express");
const router = express.Router();
const accountSettingsController = require("../controllers/accountSettingsController");


router.post("/general_info",accountSettingsController.changeGeneral);
router.post("/change_profile_photo",accountSettingsController.changeProfilePhotoOnly);
module.exports = router;