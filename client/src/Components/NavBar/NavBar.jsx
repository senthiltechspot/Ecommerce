import React, { useEffect, useState } from "react";
import "./NavBar.css";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Badge from "@mui/material/Badge";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const cookies = new Cookies();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [isLoggedin, SetLoggedin] = useState(false);
  const [openModal, setopenModal] = React.useState(false);
  const [flipislogin, setFlipislogin] = useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [decodedToken, setDecodedToken] = useState(null);
  const [totalCartItems, setTotalCartItems] = useState(null);

  const navigate = useNavigate();

  // Alert Handlers
  const handleLoginSucess = () => {
    SetLoggedin(true);
  };

  const handleSucess = () => {
    setOpenSnackBar(true);
  };

  const handleClosesnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
    SetLoggedin(false);
  };

  // Login/register Handler
  const handleflipLogin = () =>
    flipislogin ? setFlipislogin(false) : setFlipislogin(true);

  const handleOpenModal = () => setopenModal(true);
  const handleCloseModal = () => setopenModal(false);

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  // Decrypting User using accessToken
  const token = cookies.get("accessToken");

  useEffect(() => {
    const token = cookies.get("accessToken");
    if (token) {
      const decoded = jwt_decode(token);
      setDecodedToken(decoded);
    }
  }, [token]);

  // Logout User
  const handlelogout = () => {
    console.log("logout treiggered");
    cookies.remove("accessToken", { path: "/" });
    window.location.href = "/";
  };

  // Handle Cart Get Request
  const GetCartConfiguration = {
    method: "get",
    url: "http://senthiltechspot-ecommerce-api.onrender.com/ecomm/api/v1/cart/items",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  React.useEffect(() => {
    axios(GetCartConfiguration)
      .then((response) => {
        setTotalCartItems(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [totalCartItems]);

  
  return (
    <div className="NavBar">
      {/* title */}
      <h1 className="title">Ecommerce App</h1>
      <Box
        sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        className="Box"
      >
        {/* Menu List */}
        <div className="NavLink">
          <Button variant="text" style={{ color: "Black" }}>
            Home
          </Button>
          <Button
            variant="text"
            style={{ color: "Black" }}
            id="basic-button"
            aria-controls={open2 ? "category-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open2 ? "true" : undefined}
            onClick={handleClick2}
          >
            Category
          </Button>
          <Menu
            id="category-menu"
            anchorEl={anchorEl2}
            open={open2}
            onClose={handleClose2}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose2}>Electronics</MenuItem>
            <MenuItem onClick={handleClose2}>Furnitures</MenuItem>
            <MenuItem onClick={handleClose2}>Accessories</MenuItem>
          </Menu>
          <Button variant="text" style={{ color: "Black" }}>
            Contact
          </Button>
        </div>

        {/* Cart Button */}
        <div>
          <Button variant="text" color="warning">
            <Badge
              badgeContent={
                totalCartItems ? totalCartItems.items.length : 0
              }
              color="secondary"
            >
              <ShoppingCartIcon fontSize="small" />
            </Badge>
          </Button>
        </div>

        {/* Login Modal */}
        {token ? (
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {decodedToken != null ? decodedToken.user.name[0] : "A"}
              </Avatar>
            </IconButton>
          </Tooltip>
        ) : (
          <div>
            <Button onClick={handleOpenModal}>Log In</Button>
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} className="d-flex justify-content-center">
                {flipislogin ? (
                  <Login
                    handleflipLogin={handleflipLogin}
                    handleLoginSucess={handleLoginSucess}
                    handleCloseModal={handleCloseModal}
                  />
                ) : (
                  <Register
                    handleflipLogin={handleflipLogin}
                    handleSucess={handleSucess}
                  />
                )}
              </Box>
            </Modal>
          </div>
        )}
      </Box>
      {/* Account Section in Navbar */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          {decodedToken != null ? decodedToken.user.name : "Your Name"}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <Avatar /> Account
        </MenuItem>
        <Divider />

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ShoppingCartIcon fontSize="small" />
          </ListItemIcon>
          Cart
        </MenuItem>
        <MenuItem onClick={handlelogout}>
          <ListItemIcon onClick={handlelogout}>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        {decodedToken != null ? (
          decodedToken.user.isAdmin ? (
            <MenuItem onClick={() => navigate("/admin-dashboard")}>
              <Avatar /> Admin DashBoard
            </MenuItem>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </Menu>
      {/* Alert Notification Bar */}
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
          User Created Sucessfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={isLoggedin}
        autoHideDuration={6000}
        onClose={handleClosesnackbar}
      >
        <Alert
          onClose={handleClosesnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Sucessfully Logged In
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NavBar;
