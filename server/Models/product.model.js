const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: Array,
    required: true,
  },
  Qty: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
