const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// POST route for user login
router.post("/login", authController.login);

// Logout route
//router.get("/logout", authController.logout);

module.exports = router;
