const express = require("express");
const wishlistController = require("../controllers/wishlistController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated"); // You need to create this middleware

const router = express.Router();

router.get("/", ensureAuthenticated, wishlistController.getWishlist);

router.post("/", ensureAuthenticated, wishlistController.createWishlistItem);

router.delete(
  "/:id",
  ensureAuthenticated,
  wishlistController.deleteWishlistItem
);

module.exports = router;
