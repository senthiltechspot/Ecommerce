import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Cookies from "universal-cookie";
import { Button, TextField, Snackbar, Alert } from "@mui/material";

const cookies = new Cookies();
const token = cookies.get("accessToken");

const Createdata = ({ url, categoryurl }) => {
  const [name, setname] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [Category, setCategory] = useState(null);
  const [data, setData] = React.useState([]);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const handleSucess = () => {
    setOpenSnackBar(true);
  };

  const handleClosesnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };
  React.useEffect(() => {
    axios
      .get(categoryurl)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const token = cookies.get("accessToken");
  // Handle Create Request
  const configuration = {
    method: "post",
    url: url,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    data: {
      name: name,
      description,
      price,
      category: Category,
      imageUrl,
    },
  };

  if (data) {
    console.log(data);
  }

  const handleCreate = (e) => {
    // e.preventDefault();
    axios(configuration)
      .then((result) => {
        // handleClick();
        // handleSucess();
        // handleflipLogin();
       
        handleSucess()
      })
      .catch((error) => {
        // handleClickError();
        console.log(error);
      });
  };
  return (
    <div>
      <div>Create Category</div>
      <form className="d-flex flex-column gap-3">
        <TextField
          fullWidth
          label="Name"
          id="fullWidth"
          onChange={(e) => setname(e.target.value)}
          inputProps={{ maxLength: 45 }}
        />
        <TextField
          fullWidth
          label="Description"
          id="fullWidth"
          multiline
          maxRows={20}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          fullWidth
          label="Price"
          id="fullWidth"
          type={"number"}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          fullWidth
          label="Image Url"
          id="fullWidth"
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {data ? (
              data.map((items) => (
                <MenuItem key={items._id} value={items.name}>
                  {items.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value={"Others"}>Others</MenuItem>
            )}
          </Select>
        </FormControl>
        <Button variant="outlined" onClick={() => handleCreate()}>
          Create
        </Button>

        <Snackbar
          open={openSnackBar}
          autoHideDuration={6000}
          onClose={handleClosesnackbar}
        >
          <Alert
            onClose={handleClosesnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            Product Sucessfully Created
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
};

export default Createdata;
