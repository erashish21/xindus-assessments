const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const wishlistController = require("../controllers/wishlistController");

router.use("/auth", authController);
router.use("/wishlist", wishlistController);

module.exports = router;
