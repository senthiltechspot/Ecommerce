const CartController = require("../Controllers/cart.controller");
module.exports = (app) => {
  // Create a Category
  app.post("/ecomm/api/v1/cart/add", CartController.AddtoCart);

  // Get All Category
  app.delete("/ecomm/api/v1/cart/remove/:id", CartController.RemoveFromCart);

  app.put("/ecomm/api/v1/cart/update/:id", CartController.UpdateCart);

  app.get("/ecomm/api/v1/cart/items", CartController.GetAllCart);
};
