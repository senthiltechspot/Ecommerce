import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import PaidIcon from "@mui/icons-material/Paid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { Typography } from "@mui/material";
const cookies = new Cookies();

const ItemView = () => {
  const token = cookies.get("accessToken");

  const url =
    "https://senthiltechspot-ecommerce-api.onrender.com/ecomm/api/v1/cart/items";

  const [fetchedData, setFetchedData] = useState(null);
  const [update, setUpdate] = useState(false);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const [zip, setZip] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [orderItems, setorderitems] = useState(null);

  useEffect(() => {
    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };
    const getData = async () => {
      const { data } = await axios.get(url, { headers: headers });
      setFetchedData(data);
    };
    getData();
  }, [update]);

  const handleDelete = (id) => {
    const configuration = {
      method: "delete",
      url: `https://senthiltechspot-ecommerce-api.onrender.com/ecomm/api/v1/cart/items/${id}`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };

    axios(configuration)
      .then((res) => {
        setUpdate(true);
        // handleSucess();
      })
      .catch((error) => {
        console.log(error);
        // handleClickError();
      });
  };
  const HandlePlaceOrder = () => {
    AddItems();
    if (orderItems.length > 0) {
      const configuration = {
        method: "post",
        url: `https://senthiltechspot-ecommerce-api.onrender.com/ecomm/api/v1/CreateOrder`,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },

        data: {
          orderItems: orderItems,
          totalPrice: fetchedData.totalPrice,
          paymentMethod: paymentMethod,
          shippingAddress: {
            address: address,
            city: city,
            state: state,
            country: country,
            zip: zip,
          },
        },
      };

      axios(configuration)
        .then((res) => {
          setUpdate(true);
          // handleSucess();
        })
        .catch((error) => {
          console.log(error);
          // handleClickError();
        });
    } else {
      console.log("Empty Cart");
    }
  };

  //   if (fetchedData) {

  //     let AllItems = fetchedData.items.map((item) => ({
  //       product: item.productId._id,
  //       quantity: item.quantity,
  //       price: item.productId._id,
  //     }));
  //     setorderitems(AllItems);
  //     console.log("fetchedOrderitems", AllItems);
  //   }
  function AddItems() {
    let AllItems = fetchedData.items.map((item) => ({
      product: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
    }));
    setorderitems(AllItems);
    console.log("fetchedOrderitems", AllItems);
  }

  return (
    <div>
      <div className="container-fluid d-flex flex-column gap-3 mt-3">
        <div className="card" style={{ width: "100%" }}>
          <div className="card-header">Featured</div>

          {fetchedData
            ? fetchedData.items.map((item) => (
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                  }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(item._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.productId.name}
                      secondary={`Quantity : ${item.quantity}`}
                    />

                    <Typography gutterBottom variant="h6" component="div">
                      ₹ {item.productId.price}
                    </Typography>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
              ))
            : "Not items in Cart"}
        </div>
        <div className="card" style={{ width: "100%" }}>
          <div className="card-header">Address</div>
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
            }}
          >
            <div className="d-flex gap-3 p-3">
              <TextField
                required
                id="address"
                label="Adress"
                variant="standard"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <TextField
                required
                id="city"
                label="City"
                variant="standard"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <TextField
                required
                id="state"
                label="State"
                variant="standard"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />

              <TextField
                required
                id="country"
                label="Country"
                variant="standard"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />

              <TextField
                required
                id="zip"
                label="zip"
                variant="standard"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
            <Divider>Amount To Be Pay</Divider>
            <ListItem>
              <ListItemAvatar>
                <IconButton edge="end" aria-label="delete">
                  <PaidIcon />
                </IconButton>
              </ListItemAvatar>
              <ListItemText
                className="fw-bold"
                primary="Total Price"
                secondary="All Offers Applied"
              />

              <Typography gutterBottom variant="h6" component="div">
                ₹ {fetchedData ? fetchedData.totalPrice : 0}
              </Typography>
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
          <Divider>Payment Mode</Divider>
          <br />
          <div className="d-flex gap-3 justify-content-center">
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 320, maxWidth: 320 }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Select
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                label="PaymentMethod"
              >
                <MenuItem value={"debit_card"}>Debit Card</MenuItem>
                <MenuItem value={"credit_card"}>Credit Card</MenuItem>
                <MenuItem value={"paypal"}>PayPal</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="card-header">
            <button
              type="button"
              className="btn btn-warning float-end"
              onClick={() => HandlePlaceOrder()}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemView;
