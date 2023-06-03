import * as React from "react";
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

export default function OrderList({
  Url,
  from,
  searchProductname,
  searchOrderUser,
}) {
  const [isupdate, setisupdate] = React.useState(false);
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [orderStatus, setOrderStatus] = React.useState(null);
  const [PaymentStatus, setPaymentStatus] = React.useState(null);
  const [orderid, setorderid] = React.useState(null);
  const [userid, setuserid] = React.useState(null);
  const [orderDetails, setorderDetails] = React.useState(null);

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

  React.useEffect(() => {
    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };
    axios
      .get(Url, { headers })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isupdate]);

  // Handle Update Request
  const [response, setResponse] = React.useState(null);

  const UpdateOrderStatus = (id, status) => {
    const orderurl = `${process.env.REACT_APP_API}ecomm/api/v1/MyOrders/`;

    const configuration = {
      method: "put",
      url: `${orderurl}${id}/delivery`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: {
        status: status,
      },
    };
    axios(configuration)
      .then((res) => {
        setResponse(res.data);
        handleSucess();
      })
      .catch((error) => {
        console.log(error);
        handleClickError();
      });
  };

  const UpdatePaymentStatus = (id, status) => {
    const Paymenturl =
    `${process.env.REACT_APP_API}ecomm/api/v1/MyOrders/`;

    const configuration = {
      method: "put",
      url: `${Paymenturl}${id}/pay`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: {
        paymentStatus: status,
      },
    };
    axios(configuration)
      .then((res) => {
        setResponse(res.data);
        handleSucess();
      })
      .catch((error) => {
        console.log(error);
        handleClickError();
      });
  };

  React.useEffect(() => {
    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };
    axios
      .get(
        `${process.env.REACT_APP_API}ecomm/api/v1/MyOrders/${orderid}`,
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

  return (
    <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          List of All {from}
        </Typography>
        <Demo>
          {data ? (
            searchProductname ? (
              data
                .filter(
                  (orders) =>
                    orders._id.includes(searchProductname) ||
                    orders.user.includes(searchOrderUser)
                )
                .map((items) => (
                  <List dense={dense} key={items._id}>
                    <ListItem
                      secondaryAction={
                        <Button
                          onClick={() => handleOpen(items._id, items.user)}
                        >
                          View
                        </Button>
                      }
                    >
                      <ListItemText
                        primary={`Order Id : ${items._id}`}
                        secondary={`User Id : ${items.user}`}
                      />
                    </ListItem>
                    <Divider />
                  </List>
                ))
            ) : (
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
                      secondary={`User Id : ${items.user}`}
                    />
                  </ListItem>
                  <Divider />
                </List>
              ))
            )
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
          {orderDetails ? (
            <div className={"d-flex gap-3 justify-content-center"}>
              {/* <Typography id="modal-modal-description">
                Payment Method : {orderDetails.paymentMethod}
              </Typography>
              <Typography id="modal-modal-description">
                Payment Status : {orderDetails.paymentStatus}
              </Typography>
              <Typography id="modal-modal-description">
                Order status : {orderDetails.status}
              </Typography>
              <Typography id="modal-modal-description">
                Total Amount : {orderDetails.totalAmount}
              </Typography> */}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={tableborder} align="centre">
                        Payment Method{" "}
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
            </div>
          ) : (
            <></>
          )}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Order ID : {orderid}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            User ID : {userid}
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Order Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={orderStatus}
              label="Age"
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              <MenuItem value={"pending"}>Pending</MenuItem>
              <MenuItem value={"confirmed"}>Confirmed</MenuItem>
              <MenuItem value={"shipped"}>Shipped</MenuItem>
              <MenuItem value={"delivered"}>Delivered</MenuItem>
              <MenuItem value={"cancelled"}>Cancelled</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={() => UpdateOrderStatus(orderid, orderStatus)}
          >
            Update Order Status
          </Button>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Payment Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={PaymentStatus}
              label="Age"
              onChange={(e) => setPaymentStatus(e.target.value)}
            >
              <MenuItem value={"pending"}>Pending</MenuItem>
              <MenuItem value={"approved"}>Confirmed</MenuItem>
              <MenuItem value={"rejected"}>Rejected</MenuItem>
              <MenuItem value={"refunded"}>Refunded</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={() => UpdatePaymentStatus(orderid, PaymentStatus)}
          >
            Update Payment Status
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
