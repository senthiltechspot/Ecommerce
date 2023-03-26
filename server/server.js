const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./Config/db");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

connectDB();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(cookieParser());

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Ecommerce Application using Node.js and MongoDB",
  });
});

// Required routes
require("./Routes/auth.routes.js")(app);
require("./Routes/category.routes")(app);
require("./Routes/product.routes")(app);
require("./Routes/cart.routes")(app);
require("./Routes/order.routes")(app);

// listen for requests
app.listen(process.env.PORT || 3500, () => {
  console.log(`Server is listening on port ${process.env.PORT || 3500}`);
});
