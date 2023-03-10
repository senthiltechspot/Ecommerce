const Cart = require("../Models/cart.model");

// Add an item to the cart
exports.AddtoCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      // If cart already exists, update item quantity
      const itemIndex = cart.items.findIndex((p) => p.productId == productId);

      if (itemIndex !== -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      cart.totalItems = cart.items.reduce((a, c) => a + c.quantity, 0);
      cart.totalPrice = cart.items.reduce(
        (a, c) => a + c.quantity * c.product.price,
        0
      );

      const updatedCart = await cart.save();
      res.send(updatedCart);
    } else {
      // If cart doesn't exist, create a new cart
      const newCart = await Cart.create({
        user: req.user._id,
        items: [{ productId, quantity }],
        totalPrice: quantity * req.product.price,
        totalItems: quantity,
      });

      res.send(newCart);
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
};

// Remove an item from the cart
exports.RemoveFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.items = cart.items.filter(
        (item) => item._id.toString() !== req.params.id.toString()
      );

      cart.totalItems = cart.items.reduce((a, c) => a + c.quantity, 0);
      cart.totalPrice = cart.items.reduce(
        (a, c) => a + c.quantity * c.product.price,
        0
      );

      const updatedCart = await cart.save();
      res.send(updatedCart);
    } else {
      res.status(404).send({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
};

// Update item quantity in the cart
exports.UpdateCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (p) => p._id.toString() === req.params.id.toString()
      );

      if (itemIndex !== -1) {
        cart.items[itemIndex].quantity = req.body.quantity;
      }

      cart.totalItems = cart.items.reduce((a, c) => a + c.quantity, 0);
      cart.totalPrice = cart.items.reduce(
        (a, c) => a + c.quantity * c.product.price,
        0
      );

      const updatedCart = await cart.save();
      res.send(updatedCart);
    } else {
      res.status(404).send({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
};

// Get all cart items for the authenticated user
exports.GetAllCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.productId",
      "name price"
    );

    if (cart) {
      res.send(cart.items);
    } else {
      res.status(404).send({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
};

