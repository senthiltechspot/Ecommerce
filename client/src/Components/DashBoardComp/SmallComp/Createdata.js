import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Cookies from "universal-cookie";
import { Button, TextField, Typography } from "@mui/material";

const cookies = new Cookies();

const Createdata = ({ categoryurl, CreateProduct }) => {
  const [name, setname] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [Category, setCategory] = useState(null);
  const [data, setData] = useState([]);
  const [Qty, setQty] = useState(1);

  useEffect(() => {
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

  const handleCreate = async (e) => {
    const data = {
      name: name,
      description: description,
      price: price,
      category: Category,
      imageUrl: imageUrl,
      Qty: Qty,
    };
    await CreateProduct(data);
    setname(" ");
    setDescription(" ");
    setPrice(0);
    setImageUrl(" ");
    setCategory(null);
    setQty(1);
  };
  return (
    <div>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Create Product
      </Typography>
      <form className="d-flex flex-column gap-3">
        <TextField
          fullWidth
          label="Name"
          id="fullWidth"
          value={name}
          onChange={(e) => setname(e.target.value)}
          inputProps={{ maxLength: 45 }}
          required
        />
        <TextField
          fullWidth
          label="Description"
          id="fullWidth"
          multiline
          maxRows={20}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Price"
          id="fullWidth"
          type={"number"}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Quantity"
          id="fullWidth"
          type={"number"}
          value={Qty}
          onChange={(e) => setQty(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Image Url"
          id="fullWidth"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
            required
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
      </form>
    </div>
  );
};

export default Createdata;
