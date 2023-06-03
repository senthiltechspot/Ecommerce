import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import InteractiveList from "./SmallComp/InteractiveList";
import axios from "axios";
import Cookies from "universal-cookie";
import { categoryContext } from "../../UseContext/CategoryContext";
const cookies = new Cookies();
const token = cookies.get("accessToken");

const AdminCategory = (props) => {
  const { Categorydata, fetchCategory, CreateCategory, DeleteCategory } =
    useContext(categoryContext);

  const [name, setname] = useState(null);

  // const token = cookies.get("accessToken");

  const categoryurl = `${process.env.REACT_APP_API}ecomm/api/v1/category/`;

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
        <Button variant="outlined" onClick={() => CreateCategory(name)}>
          Create
        </Button>
      </div>
      <div className="d-flex justify-content-evenly">
        <InteractiveList
          from={"Category"}
          data={Categorydata}
          deleteiItem={DeleteCategory}
        />
      </div>
    </div>
  );
};

export default AdminCategory;
