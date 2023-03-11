const Category = require("../Models/category.model");

// Create a Category
exports.CreateCategory = async (req, res) => {
  const { name } = req.body;

  try {
    // Check if the category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // Create a new category
    const category = new Category({ name });

    // Save the category to the database
    const savedCategory = await category.save();

    // Return the saved category
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Category
exports.GetAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Category By id
exports.DeleteCategoryById = async (req, res) => {
  try {
    const deletedProduct = await Category.deleteOne({ _id: req.params.id });
    if (deletedProduct.deletedCount === 0) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.send({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
};
