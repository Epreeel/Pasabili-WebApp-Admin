const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userController = require("../controllers/userController");

router.post("/login",userController.login);
router.post("/logout",userController.logout);
router.post("/employees/add",userController.registerAdmin);
router.get("/employees",userController.getAllAdminAndItinerant);

module.exports = router;