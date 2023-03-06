const categoryController = require("../Controllers/category.controllers")
const { requestValidator,authJWT } = require("../Middleware")

module.exports = (app) => {
    //Create a new Category
    app.post("/ecomm/api/v1/category", [requestValidator.validateCategoryRequest,authJWT.verifyToken], categoryController.create)

    //get all the routes
    app.get("/ecomm/api/v1/category", categoryController.getAll);

    //get route y category id
    app.get("/ecomm/api/v1/category/:id", categoryController.getOne);

    //Update a route by given id
    app.put("/ecomm/api/v1/category/:id",[authJWT.verifyToken], categoryController.update);

    // delete A route by a category id
    app.delete("/ecomm/api/v1/category/:id",[authJWT.verifyToken], categoryController.delete);

}