import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import InteractiveList from "./SmallComp/InteractiveList";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("accessToken");

const AdminCategory = () => {
  const [name, setname] = useState(null);
  const token = cookies.get("accessToken");

  const categoryurl =
    "https://senthiltechspot-ecommerce-api.onrender.com/ecomm/api/v1/category/";

  const DeleteCategoryurl =
    "https://senthiltechspot-ecommerce-api.onrender.com/ecomm/api/v1/category/";

  // Handle Create Request
  const configuration = {
    method: "post",
    url: categoryurl,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    data: {
      name: name,
    },
  };
  const handleCreate = (e) => {
    // e.preventDefault();
    axios(configuration)
      .then((result) => {
        // handleClick();
        // handleSucess();
        // handleflipLogin();
        useEffect(() => {
          console.log(result);
        }, [result]);
      })
      .catch((error) => {
        // handleClickError();
        console.log(error);
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-evenly gap-3">
        <h1>Category</h1>
        <TextField
          fullWidth
          label="Create Category"
          id="fullWidth"
          onChange={(e) => setname(e.target.value)}
        />
        <Button variant="outlined" onClick={() => handleCreate()}>
          Create
        </Button>
      </div>
      <div className="d-flex justify-content-evenly">
        <InteractiveList Url={categoryurl} from={"Category"} />
      </div>
    </div>
  );
};

export default AdminCategory;
