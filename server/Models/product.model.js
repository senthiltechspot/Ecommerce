const mongoose = require("mongoose");
const Cart = require("../Models/cart.model");
const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  imageUrl: String,
});

ProductSchema.pre("remove", async function (next) {
  try {
    await Cart.updateMany(
      { "items.productId": this._id },
      { $pull: { items: { productId: this._id } } }
    );
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Product", ProductSchema);
