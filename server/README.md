# Ecommerce Backend API Routes
 <h6>
            © Designed and Developed by
            <a href="https://github.com/Senthilspot"> Senthilspot</a>
</h6>
# Auth Routes

    //Sign-Up
    post "/ecomm/api/v1/auth/signup"

    //Signin
    post "/ecomm/api/v1/auth/signin"

# Category Routes

    //Create a new Category
    post "/ecomm/api/v1/category"

    //get all the routes
    get "/ecomm/api/v1/category"


    // delete a category by id
    delete "/ecomm/api/v1/category/:id"

# PRODUCT ROUTES

    // Create a New Product
    post "/ecomm/api/v1/products"

    //get all the Products
    get"/ecomm/api/v1/products"

    //Update a Product by id
    put "ecomm/api/v1/products/:id"

    // delete A Product by a id
    delete "/ecomm/api/v1/products/:id"

    //Find Product product by id
    get "/ecomm/api/v1/products/:id"

# Cart Routs

    //Add items to Cart
    post "/ecomm/api/v1/cart/add"

    //Remove item from cart using itemid
    delete "/ecomm/api/v1/cart/items/:itemId"

    //Get All items in a Cart
    get "/ecomm/api/v1/cart/items"


# Order Routes

    //Get All Order For Admin
    get "/ecomm/api/v1/orders"

    //Get All order for User
    get  "/ecomm/api/v1/myOrders"

    //Create a Order for User
    post  "/ecomm/api/v1/CreateOrder"

    //Get Order By id
    get "/ecomm/api/v1/MyOrders/:id"

    //Update Order Payment
    put  "/ecomm/api/v1/MyOrders/:id/pay"

    //Update Order Delivery
    put "/ecomm/api/v1/MyOrders/:id/delivery"


