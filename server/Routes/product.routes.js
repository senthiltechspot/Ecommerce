const ProductController = require("../Controllers/products.controller");
const authJWt = require("../MiddleWare/authJWt");

module.exports = (app) => {
  // Create a Products
  app.post(
    "/ecomm/api/v1/products",
    [authJWt.isAuthenticatedAdmin],
    ProductController.CreateProduct
  );

  // Get All Products
  app.get("/ecomm/api/v1/products", ProductController.GetAllProducts);

  // Get Products by id
  app.get("/ecomm/api/v1/products/:id", ProductController.GetProductById);

  //  Update Products by id
  app.put(
    "/ecomm/api/v1/products/:id",
    [authJWt.isAuthenticatedAdmin],
    ProductController.UpdateProductById
  );

  //  Delete Products
  app.delete(
    "/ecomm/api/v1/products/:id",
    [authJWt.isAuthenticatedAdmin],
    ProductController.DeleteProductById
  );
};
