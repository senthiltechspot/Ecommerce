import { TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import InteractiveList from "./SmallComp/InteractiveList";
import { productContext } from "../../UseContext/ProductContext";
import Createdata from "./SmallComp/Createdata";

const AdminProduct = () => {
  const [searchProductname, setSearchProductname] = useState(null);
  // const [isupdate, setisupdate] = React.useState(false);

  // const Producturl = `${process.env.REACT_APP_API}ecomm/api/v1/products/`;
  const categoryurl = `${process.env.REACT_APP_API}ecomm/api/v1/category/`;

  const { ProductData, fetchProducts, CreateProduct, DeleteProduct } =
    useContext(productContext);

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <div className="d-flex justify-content-evenly gap-3">
        <Typography variant="h3">Products</Typography>
        <TextField
          fullWidth
          label="Search Products"
          id="fullWidth"
          value={searchProductname}
          onChange={(e) => {
            setSearchProductname(e.target.value);
          }}
        />
      </div>
      <div className="d-flex justify-content-around gap-3 ">
        <div className="p-2 flex-grow-1">
          <InteractiveList
            from={"Products"}
            searchProductname={searchProductname}
            data={ProductData}
            deleteiItem={DeleteProduct}
          />
        </div>
        <div className="p-2 flex-grow-1">
          <Createdata
            // url={Producturl}
            categoryurl={categoryurl}
            // setisupdate={setisupdate}
            CreateProduct={CreateProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
