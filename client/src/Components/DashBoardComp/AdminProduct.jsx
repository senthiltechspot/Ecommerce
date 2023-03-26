import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import Createdata from "./SmallComp/Createdata";
import InteractiveList from "./SmallComp/InteractiveList";

const AdminProduct = () => {
  const Producturl =
    "https://senthiltechspot-ecommerce-api.onrender.com/ecomm/api/v1/products/";
  const categoryurl =
    "https://senthiltechspot-ecommerce-api.onrender.com/ecomm/api/v1/category/";
  return (
    <div>
      <div className="d-flex justify-content-evenly gap-3">
        <Typography variant="h5" component="h2">
          Products
        </Typography>
        <TextField fullWidth label="Search Products" id="fullWidth" />
        <Button variant="outlined">Search</Button>
      </div>
      <div className="d-flex justify-content-around gap-3 ">
        <div className="p-2 flex-grow-1">
          <InteractiveList Url={Producturl} from={"Products"} />
        </div>
        <div className="p-2 "> 
          <Createdata url={Producturl} categoryurl={categoryurl} />
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
