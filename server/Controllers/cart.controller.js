const Cart = require("../Models/cart.model");
const Product = require("../Models/product.model");

// Add an item to the cart
exports.AddtoCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Find the product in the database
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.Qty < quantity) {
      return res
        .status(404)
        .json({ message: "Product Quantity Not Available" });
    }
    // Calculate the total price of the item
    const totalPrice = product.price * quantity;

    // Find the user's cart in the database, or create a new one if it doesn't exist
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
      });
    }

    // Check if the item already exists in the cart
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      if (product.Qty < existingItem.quantity + quantity) {
        return res
          .status(404)
          .json({ message: "Product Quantity Not Available" });
      }
      // Update the quantity and total price of the existing item
      existingItem.quantity += quantity;
      existingItem.totalPrice += totalPrice;
    } else {
      // Add a new item to the cart
      cart.items.push({
        productId: productId,
        quantity: quantity,
      });
    }
    (cart.totalItems += quantity), (cart.totalPrice += totalPrice);

    // Save the updated cart to the database
    await cart.save();

    res.status(201).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Remove an item from the cart
exports.RemoveFromCart = async (req, res) => {
  const itemId = req.params.itemId;

  try {
    // Find the user's cart in the database
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item in the cart by ID
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId.toString()
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    console.log(itemIndex);

    // Find the product in the database
    const product = await Product.findById(cart.items[itemIndex].productId);

    console.log(product);

    // Calculate the total price of the item
    const itemPrice = product.price * cart.items[itemIndex].quantity;

    // Update the total price and quantity of the cart
    cart.totalPrice -= itemPrice;
    cart.totalItems -= cart.items[itemIndex].quantity;

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Save the updated cart to the database
    await cart.save();

    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all cart items for the authenticated user
exports.GetAllProductsFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.productId",
      "name price"
    );

    if (cart) {
      res.send(cart);
    } else {
      res.status(404).send({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
};

// Delete all cart items for the authenticated user
exports.DeleteCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    console.log(cart);
    await cart.deleteOne({ _id: cart._id });
    return res.status(200).json({ message: "Cart deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
