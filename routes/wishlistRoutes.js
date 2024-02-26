const express = require("express");
const wishlistController = require("../controllers/wishlistController");
const ensureAuthenticated = require("../config/ensureAuthenticated");

const router = express.Router();

router.get("/", ensureAuthenticated, wishlistController.getWishlist);

router.post("/", ensureAuthenticated, wishlistController.createWishlistItem);

// router.post("/", ensureAuthenticated, (req, res) => {
//   console.log("Received POST request to /api/wishlists");
//   // ... (rest of the code)
// });


router.delete(
  "/:id",
  ensureAuthenticated,
  wishlistController.deleteWishlistItem
);

module.exports = router;
