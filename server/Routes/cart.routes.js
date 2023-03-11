const CartController = require("../Controllers/cart.controller");
const authJWt = require("../MiddleWare/authJWt");

module.exports = (app) => {
  // Add item to Cart
  app.post(
    "/ecomm/api/v1/cart/add",
    [authJWt.isAuthenticated],
    CartController.AddtoCart
  );

  // Remove Items from cart
  app.delete(
    "/ecomm/api/v1/cart/items/:itemId",
    [authJWt.isAuthenticated],
    CartController.RemoveFromCart
  );

  // Get All items from Cart
  app.get(
    "/ecomm/api/v1/cart/items",
    [authJWt.isAuthenticated],
    CartController.GetAllProductsFromCart
  );
};
