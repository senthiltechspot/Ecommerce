const CategoryController = require("../Controllers/category.controller");
const authJWt = require("../MiddleWare/authJWt");
module.exports = (app) => {
  // Create a Category
  app.post(
    "/ecomm/api/v1/category",
    [authJWt.isAuthenticatedAdmin],
    CategoryController.CreateCategory
  );

  // Get All Category
  app.get("/ecomm/api/v1/category", CategoryController.GetAllCategory);

  // Delete Category By Id
  app.delete(
    "/ecomm/api/v1/category/:id",
    [authJWt.isAuthenticatedAdmin],
    CategoryController.DeleteCategoryById
  );
};
