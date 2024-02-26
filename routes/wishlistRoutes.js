const express = require("express");
const wishlistController = require("../controllers/wishlistController");
const ensureAuthenticated = require("../config/ensureAuthenticated");

const router = express.Router();

router.get("/", ensureAuthenticated, wishlistController.getWishlist);

router.post("/", ensureAuthenticated, wishlistController.createWishlistItem);

router.delete(
  "/:id",
  ensureAuthenticated,
  wishlistController.deleteWishlistItem
);

module.exports = router;
