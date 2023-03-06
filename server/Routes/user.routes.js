const userController = require("../Controllers/user.controller");
const { authJWT } = require("../Middleware");

module.exports = (app) => {
    app.get("/ecomm/api/v1/users", userController.findAll);
    app.delete("/ecomm/api/v1/users/:id", [authJWT.verifyToken], userController.delete);
    //Update a route by given id
    app.put("/ecomm/api/v1/users/:id", [authJWT.verifyToken], userController.update);
}