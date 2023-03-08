const authController = require("../Controllers/auth.controller")
module.exports = (app) => {
    app.post("/ecomm/api/v1/auth/signup", authController.register)

    app.post("/ecomm/api/v1/auth/signin", authController.login)

    app.post("/ecomm/api/v1/auth/signout", authController.logout)
}