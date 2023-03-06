const { signupValidator } = require("../Middleware")
const authController = require("../Controllers/auth.controller")
module.exports = (app) => {
    app.post("/ecomm/api/v1/auth/signup", [signupValidator.Validemailandusername, signupValidator.checkRoleExist], authController.signup)

    app.post("/ecomm/api/v1/auth/signin", authController.signIn)
}