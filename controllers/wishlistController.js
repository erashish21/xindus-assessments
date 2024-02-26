const WishlistItem = require("../models/WishlistItem"); 

async function getWishlist(req, res) {
  try {
    const userId = req.user._id;
    const wishlist = await WishlistItem.find({ user: userId });
    res.status(200).json({ wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createWishlistItem(req, res) {
  try {
    const userId = req.user._id;
    const { itemName } = req.body;

    // Create a new wishlist item
    const newWishlistItem = new WishlistItem({ user: userId, itemName });
    await newWishlistItem.save();

    res.status(201).json({ message: "Wishlist item created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteWishlistItem(req, res) {
  try {
    const userId = req.user._id;
    const itemId = req.params.id;

    // Delete the wishlist item by ID and user
    await WishlistItem.findOneAndDelete({ _id: itemId, user: userId });

    res.status(200).json({ message: "Wishlist item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getWishlist, createWishlistItem, deleteWishlistItem };
