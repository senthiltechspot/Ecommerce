import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Cookies from "universal-cookie";
import {
  Snackbar,
  Alert,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "90%",
};
const cookies = new Cookies();

const tableborder = {
  borderWidth: 0,
  borderWidth: 1,
  borderColor: "black",
  borderStyle: "solid",
};
const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const Orders = () => {
  const [isupdate, setisupdate] = React.useState(false);

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const [data, setData] = React.useState([]);

  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const [orderStatus, setOrderStatus] = React.useState(null);
  const [orderid, setorderid] = React.useState(null);
  const [userid, setuserid] = React.useState(null);
  const [orderDetails, setorderDetails] = React.useState(null);
  const [ProductDetails, setProductDetails] = React.useState(null);

  const handleOpen = (orderid, userid) => {
    setorderid(orderid);
    setuserid(userid);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickError = () => {
    setOpenError(true);
  };
  const token = cookies.get("accessToken");

  const handleSucess = () => {
    setOpenSnackBar(true);
    setisupdate(true);
  };

  const handleClosesnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setOpenSnackBar(false);
    setisupdate(false);
  };

  //   Get order details for the user
  React.useEffect(() => {
    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };
    axios
      .get(
        `https://senthiltechspot-ecommerce-api.onrender.com/ecomm/api/v1/MyOrders/${orderid}`,
        { headers }
      )
      .then((response) => {
        setorderDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [orderid, isupdate]);

  //   Get All List for the user
  React.useEffect(() => {
    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };
    axios
      .get(
        "https://senthiltechspot-ecommerce-api.onrender.com/ecomm/api/v1/myOrders",
        { headers }
      )
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isupdate]);

  //   Get Product details
  //   React.useEffect(() => {
  //     axios
  //       .get(
  //         `https://senthiltechspot-ecommerce-api.onrender.com/ecomm/api/v1/products/${
  //           orderDetails ? ProductDetails.name : "640c58dcff5e3a5097ef4bd4"
  //         }`
  //       )
  //       .then((response) => {
  //         setProductDetails(response.data);
  //         console.log(response.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, [ProductDetails]);

  //   const getProductdetails = (productid) => {
  //     axios
  //       .get(
  //         `https://senthiltechspot-ecommerce-api.onrender.com/ecomm/api/v1/products/${productid}`
  //       )
  //       .then((response) => {
  //         // setProductDetails(response.data);
  //         // console.log(response.data);
  //         return response.data;
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  //   useEffect(() => {
  //     if (orderDetails) {
  //       const productdetail = orderDetails.products.map((products) => {
  //          getProductdetails(products.product);
  //       });
  //       console.log("Productdetailsget", productdetail);
  //       setProductDetails(productdetail);
  //     }
  //   }, [orderDetails]);

  return (
    <div>
      <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            List of All
          </Typography>
          <Demo>
            {data ? (
              data.map((items) => (
                <List dense={dense} key={items._id}>
                  <ListItem
                    secondaryAction={
                      <Button onClick={() => handleOpen(items._id, items.user)}>
                        View
                      </Button>
                    }
                  >
                    <ListItemText
                      primary={`Order Id : ${items._id}`}
                      secondary={`Order Created Date : ${items.createdAt.slice(
                        0,
                        10
                      )}`}
                    />
                  </ListItem>
                  <Divider />
                </List>
              ))
            ) : (
              <List dense={dense}>
                <ListItem
                  secondaryAction={<Button onClick={handleOpen}>View</Button>}
                >
                  <ListItemText
                    primary="Category Not Found"
                    secondary={secondary ? "Secondary text" : null}
                  />
                </ListItem>
              </List>
            )}
          </Demo>
        </Grid>

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
            Operation Completed Sucessfully
          </Alert>
        </Snackbar>
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleClosesnackbar}
        >
          <Alert
            onClose={handleClosesnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            Something went Wrong
          </Alert>
        </Snackbar>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className={"d-flex flex-column gap-3"}>
            <Typography id="modal-modal-title" component="h6">
              Order ID : {orderid}
            </Typography>
            {orderDetails ? (
              <div
                className={"d-flex flex-column gap-3 justify-content-center"}
              >
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={tableborder} align="centre">
                          Payment Method
                        </TableCell>
                        <TableCell sx={tableborder} align="centre">
                          Payment Status
                        </TableCell>
                        <TableCell sx={tableborder} align="centre">
                          Order status
                        </TableCell>
                        <TableCell sx={tableborder} align="centre">
                          Total Amount
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={tableborder} align="centre">
                          {orderDetails.paymentMethod}
                        </TableCell>
                        <TableCell sx={tableborder} align="centre">
                          {orderDetails.paymentStatus}
                        </TableCell>
                        <TableCell sx={tableborder} align="centre">
                          {orderDetails.status}
                        </TableCell>
                        <TableCell sx={tableborder} align="centre">
                          {orderDetails.totalAmount}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                {orderDetails.shipping ? (
                  <div>
                    <Typography id="modal-modal-title" component="h3">
                      Shippping Address :
                    </Typography>
                    <Typography id="modal-modal-title" component="h6">
                      {orderDetails.shipping.address}
                    </Typography>
                    <Typography id="modal-modal-title" component="h6">
                      City : {orderDetails.shipping.city}
                    </Typography>
                    <Typography id="modal-modal-title" component="h6">
                      State : {orderDetails.shipping.state}
                    </Typography>
                    <Typography id="modal-modal-title" component="h2">
                      Country : {orderDetails.shipping.country}
                    </Typography>
                    <Typography id="modal-modal-title" component="h2">
                      ZipCode : {orderDetails.shipping.zip}
                    </Typography>
                  </div>
                ) : (
                  <Typography id="modal-modal-title" component="h2">
                    No Shipping Address Found
                  </Typography>
                )}
              </div>
            ) : (
              <></>
            )}

            {orderDetails ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={tableborder} align="centre">
                        Name :
                      </TableCell>
                      <TableCell sx={tableborder} align="centre">
                        Quantity :
                      </TableCell>
                      <TableCell sx={tableborder} align="centre">
                        Price :
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderDetails.products.map((products) => {
                      <TableRow>
                        <TableCell sx={tableborder} align="centre">
                          {/* {getProductdetails(products.product)} */}
                          {ProductDetails
                            ? ProductDetails.name
                            : products.product}
                        </TableCell>
                        <TableCell sx={tableborder} align="centre">
                          {products.quantity}
                        </TableCell>
                        <TableCell sx={tableborder} align="centre">
                          {products.price}
                        </TableCell>
                      </TableRow>;
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <></>
            )}
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default Orders;
