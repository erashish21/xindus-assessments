const WishlistItem = require("../models/WishlistItem");

async function getWishlist(req, res) {
  try {
    console.log("Received GET request to /api/wishlists");
    const userId = req.user._id;
    console.log("User ID:", userId);
    const wishlist = await WishlistItem.find({ user: userId });
    console.log("Wishlist:", wishlist);
    res.status(200).json({ wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createWishlistItem(req, res) {
  try {
    console.log("Received POST request to /api/wishlists");
    const userId = req.user._id;
    console.log("User ID:", userId);

    const { itemName } = req.body;
    console.log("Item Name:", itemName);

    // Create a new wishlist item
    const newWishlistItem = new WishlistItem({ user: userId, itemName });
    await newWishlistItem.save();

    console.log("Wishlist item created successfully");
    res.status(201).json({ message: "Wishlist item created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteWishlistItem(req, res) {
  try {
    console.log("Received DELETE request to /api/wishlists/:id");
    const userId = req.user._id;
    console.log("User ID:", userId);

    const itemId = req.params.id;
    console.log("Item ID:", itemId);

    // Delete the wishlist item by ID and user
    await WishlistItem.findOneAndDelete({ _id: itemId, user: userId });

    console.log("Wishlist item deleted successfully");
    res.status(200).json({ message: "Wishlist item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getWishlist, createWishlistItem, deleteWishlistItem };
