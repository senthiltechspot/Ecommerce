const Product = require("../Models/product.model");

// Create a Product
exports.CreateProduct = async (req, res) => {
  const { name, description, price, category, imageUrl, Qty } = req.body;

  try {
    // Create a new product
    const product = new Product({
      name,
      description,
      price,
      category,
      imageUrl,
      Qty,
    });

    // Save the product to the database
    const savedProduct = await product.save();

    // Return the saved product
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Products
exports.GetAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GetProduct by ID
exports.GetProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate("category", "name");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Product By Id
exports.UpdateProductById = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, imageUrl, Qty } = req.body;

  try {
    // Check if the product exists
    const existingProduct = await Product.findById(id).populate(
      "category",
      "name"
    );
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product data
    if (name) {
      existingProduct.name = name;
    }
    if (description) {
      existingProduct.description = description;
    }
    if (price) {
      existingProduct.price = price;
    }
    if (category) {
      existingProduct.category = category;
    }
    if (imageUrl) {
      existingProduct.imageUrl = imageUrl;
    }
    if (Qty) {
      existingProduct.Qty = Qty;
    }

    // Save the updated product to the database
    const updatedProduct = await existingProduct.save();

    // Return the updated product
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Product By id
exports.DeleteProductById = async (req, res) => {
  try {
    const deletedProduct = await Product.deleteOne({ _id: req.params.id });
    if (deletedProduct.deletedCount === 0) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.send({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
};
