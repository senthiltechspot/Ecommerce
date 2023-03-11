const mongoose = require("mongoose");
const Cart = require("../Models/cart.model");
const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  imageUrl: String,
});

module.exports = mongoose.model("Product", ProductSchema);
