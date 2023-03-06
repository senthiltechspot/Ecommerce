const ProductControllers = require("../Controllers/product.controllers")
const { requestValidator, authJWT } = require("../Middleware")

module.exports = (app) => {
    // Create a New Product
    app.post("/ecomm/api/v1/products", [requestValidator.valideteProductRequest,authJWT.verifyToken], ProductControllers.create)

    //get all the routes
    app.get("/ecomm/api/v1/products", ProductControllers.findAll);

    //get route y category id
    app.get("/ecomm/api/v1/products/:id", ProductControllers.findOne);

    //Update a route y given id
    app.put("/ecomm/api/v1/products/:id", ProductControllers.update);

    // delete A route by a category id
    app.delete("/ecomm/api/v1/products/:id", ProductControllers.delete);

    //Find all Products by the Category id
    app.get("/ecomm/api/v1/category/:categoryid/products/", requestValidator.validateCategoryPassed, ProductControllers.getallproductbycategoryid);


    //Find Product with product the Category id
    app.get("/ecomm/api/v1/category/:categoryid/products/:productid", requestValidator.validateCategoryAndProductPassed, ProductControllers.findproductundercategory);
}