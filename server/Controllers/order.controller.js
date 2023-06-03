const Order = require("../Models/order.model");
const Product = require("../Models/product.model");

// Get All Orders for Admin
exports.AllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    console.log(orders);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Order for Users
exports.UserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a New Order
exports.CreateOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product || product.Qty < item.quantity) {
        return res.status(404).json({
          message: "Product is Not Available " + ` ${item.product}`,
        });
      }
    }

    const order = new Order({
      products: orderItems,
      user: req.user._id,
      shipping: shippingAddress,
      paymentMethod: paymentMethod,
      totalAmount: totalPrice,
    });

    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      product.Qty -= item.quantity;

      // Save the updated product to the database
      await product.save();
    }

    const createdOrder = await order.save();

    res.status(201).json({ message: "Order Created Sucessfully", createdOrder });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Order By Id
exports.GetOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update Payment Status
exports.UpdateOrderpayment = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      order.paymentStatus = req.body.paymentStatus;
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update to Delivery Status
exports.UpdateDeliveryStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      order.status = req.body.status;
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
