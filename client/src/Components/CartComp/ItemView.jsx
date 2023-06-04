import React, { useContext, useEffect, useState } from "react";
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
import { Box, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { alertContext } from "../../UseContext/AlertContext";
import DeleteItemFromCart from "../../Handlers/DeleteItemFromCart";
import HandlePlaceOrder from "../../Handlers/HandlePlaceOrder";

const cookies = new Cookies();

const ItemView = () => {
  const navigate = useNavigate();

  const token = cookies.get("accessToken");

  const url = `${process.env.REACT_APP_API}ecomm/api/v1/cart/items`;

  const [fetchedData, setFetchedData] = useState(null);
  const [update, setUpdate] = useState(false);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const [zip, setZip] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [orderItems, setOrderItems] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const value = useContext(alertContext);
  const {
    OpenAlert,
    setOpenAlert,
    Message,
    setMessage,
    AlertType,
    setAlertType,
    openBackDrop,
    setOpenBackDrop,
  } = value;

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
    DeleteItemFromCart(
      id,
      setOpenAlert,
      setOpenBackDrop,
      setMessage,
      setAlertType,
      setUpdate
    );
  };

  useEffect(() => {
    if (fetchedData) {
      let AllItems = fetchedData.items.map((item) => ({
        product: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      }));
      setOrderItems(AllItems);
    }
  }, [fetchedData, update]);

  const PlaceOrder = async () => {
    if (orderItems) {
      HandlePlaceOrder(
        setOpenAlert,
        setOpenBackDrop,
        setMessage,
        setAlertType,
        orderItems,
        fetchedData,
        paymentMethod,
        address,
        city,
        state,
        country,
        zip,
        navigate
      );
    } else {
      console.log("Empty Cart");
      setAlertType("error");
      setMessage("Cart is Empty!");
      setOpenAlert(true);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100%",
            background: "#ccc",
            opacity: 0.5,
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            sx={{
              zIndex: 2,
            }}
          />
        </Box>
      ) : (
        <></>
      )}
      <div className="container-fluid d-flex flex-column gap-3 mt-3">
        <div className="card" style={{ width: "100%" }}>
          <div className="card-header">Products</div>
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
            <div className="d-flex flex-wrap gap-3 p-3 justify-content-center">
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
              onClick={() => PlaceOrder()}
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
