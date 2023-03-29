const OrderController = require("../Controllers/order.controller");
const authJWt = require("../MiddleWare/authJWt");
module.exports = (app) => {
  // Get All Order For Admin
  app.get(
    "/ecomm/api/v1/orders",
    [authJWt.isAuthenticatedAdmin],
    OrderController.AllOrders
  );

  //   Get All order for User
  app.get(
    "/ecomm/api/v1/myOrders",
    [authJWt.isAuthenticated],
    OrderController.UserOrders
  );

  //   Create a Order for User
  app.post(
    "/ecomm/api/v1/CreateOrder",
    [authJWt.isAuthenticated],
    OrderController.CreateOrder
  );

  //   Get Order By id
  app.get(
    "/ecomm/api/v1/MyOrders/:id",
    [authJWt.isAuthenticated],
    OrderController.GetOrderById
  );

  //   Update Order Payment
  app.put(
    "/ecomm/api/v1/MyOrders/:id/pay",
    [authJWt.isAuthenticated],
    OrderController.UpdateOrderpayment
  );

  //   Update Order Delivery
  app.put(
    "/ecomm/api/v1/MyOrders/:id/delivery",
    [authJWt.isAuthenticatedAdmin],
    OrderController.UpdateDeliveryStatus
  );
};
