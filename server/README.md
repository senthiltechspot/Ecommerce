# FSD Ecommerce 

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

    //get route y category id
    get "/ecomm/api/v1/category/:id"

    //Update a route by given id
    put "/ecomm/api/v1/category/:id"

    // delete A route by a category id
    delete "/ecomm/api/v1/category/:id"

# PRODUCT ROUTES

    // Create a New Product
    post "/ecomm/api/v1/products"

    //get all the routes
    get"/ecomm/api/v1/products"


    //get route y category id
    get "/ecomm/api/v1/products/:id"

    //Update a route y given id
    put "/ecomm/api/v1/products/:id" 

    // delete A route by a category id
    delete "/ecomm/api/v1/products/:id" 

    //Find all Products by the Category id
    get "/ecomm/api/v1/category/:categoryid/products/"  


    //Find Product with product the Category id
    get "/ecomm/api/v1/category/:categoryid/products/:productid"

# Cart Routs

    //Add Cart
    post "/ecomm/api/v1/carts"

    //Update Cart
    put "/ecomm/api/v1/carts"

    //get Cart
    get "/ecomm/api/v1/carts"

    //Delete Cart
    delete "/ecomm/api/v1/carts/products/:id"


# User Routes

    //Find all User
    get "/ecomm/api/v1/users"
    
    //Delete User by id
    delete "/ecomm/api/v1/users/:id"
    
    //Update User by id
    delete"/ecomm/api/v1/users/:id"