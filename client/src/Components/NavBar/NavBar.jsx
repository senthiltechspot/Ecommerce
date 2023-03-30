import React, { useEffect, useState } from "react";
import {
  AppBar,
  Grid,
  Tabs,
  Tab,
  Toolbar,
  Typography,
  Box,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  Badge,
  Avatar,
  Tooltip,
  Modal,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import DrawerComp from "./DrawerComp";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Logout from "@mui/icons-material/Logout";

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

const NavBar = ({ isUpdated }) => {
  const navigate = useNavigate();

  //   Drawer Comp
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState(null);

  //   Menu OpenCLose
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open2 = Boolean(anchorEl2);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  //   FeedBack/Alert
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [isLoggedin, SetLoggedin] = useState(false);

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

  //   User Handle
  // Login/register Handler
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [flipislogin, setFlipislogin] = useState(false);
  const [openModal, setopenModal] = React.useState(false);

  const handleflipLogin = () =>
    flipislogin ? setFlipislogin(false) : setFlipislogin(true);

  const handleOpenModal = () => setopenModal(true);
  const handleCloseModal = () => setopenModal(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Decrypting User using accessToken
  const token = cookies.get("accessToken");
  const [decodedToken, setDecodedToken] = useState(null);

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

  //   Cart
  const [totalCartItems, setTotalCartItems] = useState(null);

  // Handle Cart Get Request
  useEffect(() => {
    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    axios
      .get(`${process.env.REACT_APP_API}ecomm/api/v1/cart/items`, {
        headers: headers,
      })
      .then((response) => {
        setTotalCartItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isUpdated]);

  return (
    <div className="NavBar">
      <AppBar sx={{ backgroundColor: "white" }} position="static">
        <Toolbar>
          <Grid sx={{ placeItems: "center" }} container>
            {isMatch == true ? (
              <>
                <Grid item xs={4}>
                  <Typography sx={{ color: "black" }}>Ecommerce App</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Box display="flex">
                    <Button
                      variant="text"
                      color="warning"
                      onClick={() => navigate("/Cart")}
                      sx={{ marginLeft: "auto" }}
                    >
                      <Badge
                        sx={{ marginLeft: 1 }}
                        badgeContent={
                          totalCartItems ? totalCartItems.totalItems : 0
                        }
                        color="secondary"
                      >
                        <ShoppingCartIcon fontSize="small" />
                      </Badge>
                    </Button>
                    <DrawerComp
                      decodedToken={decodedToken}
                      handlelogout={handlelogout}
                      handleOpenModal={handleOpenModal}
                    />
                  </Box>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={2}>
                  <Typography sx={{ color: "black" }}>Ecommerce App</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Tabs
                    indicatorColor="secondary"
                    value={value}
                    onChange={(e, val) => setValue(val)}
                  >
                    <Tab label="Home" onClick={() => navigate(`/`)} />
                    <Tab
                      variant="text"
                      style={{ color: "Black" }}
                      id="basic-button"
                      aria-controls={open2 ? "category-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open2 ? "true" : undefined}
                      onClick={handleClick2}
                      label="Category"
                    >
                      Category
                    </Tab>
                    <Tab
                      label="About Us"
                      onClick={() => navigate(`/about-us`)}
                    />
                    <Menu
                      id="category-menu"
                      anchorEl={anchorEl2}
                      open={open2}
                      onClose={handleClose2}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {["Electronics", "Furniture", "Mobiles", "Books"].map(
                        (text, index) => (
                          <MenuItem
                            onClick={() => navigate(`/Category/${text}`)}
                          >
                            {text}
                          </MenuItem>
                        )
                      )}
                    </Menu>
                  </Tabs>
                </Grid>
                <Grid item xs={4}>
                  <Box display="flex">
                    {token ? (
                      <Box sx={{ marginLeft: "auto" }}>
                        <Button
                          variant="text"
                          color="warning"
                          onClick={() => navigate("/Cart")}
                        >
                          <Badge
                            badgeContent={
                              totalCartItems ? totalCartItems.totalItems : 0
                            }
                            color="secondary"
                          >
                            <ShoppingCartIcon fontSize="small" />
                          </Badge>
                        </Button>

                        <Tooltip
                          title="Account settings"
                          sx={{ marginLeft: 1 }}
                        >
                          <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                          >
                            <Avatar sx={{ width: 32, height: 32 }}>
                              {decodedToken != null
                                ? decodedToken.user.name[0]
                                : "A"}
                            </Avatar>
                          </IconButton>
                        </Tooltip>
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
                              filter:
                                "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
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
                          transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                          }}
                          anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                          }}
                        >
                          <MenuItem onClick={handleClose}>
                            {decodedToken != null
                              ? `Hi ${decodedToken.user.name}`
                              : "Your Name"}
                          </MenuItem>
                          <Divider />
                          <MenuItem onClick={() => navigate("/dashboard")}>
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
                              <MenuItem
                                onClick={() => navigate("/admin-dashboard")}
                              >
                                <Avatar /> Admin DashBoard
                              </MenuItem>
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}
                        </Menu>
                      </Box>
                    ) : (
                      // End of Logged User
                      // If User Not Logged in
                      <>
                        <Box sx={{ marginLeft: "auto" }}>
                          <Button
                            sx={{ marginLeft: "auto" }}
                            variant="contained"
                            onClick={handleOpenModal}
                          >
                            Login
                          </Button>
                        </Box>
                      </>
                    )}
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      {/* Alert Notification Bar */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="d-flex justify-content-center">
          {flipislogin ? (
            <Register
              handleflipLogin={handleflipLogin}
              handleSucess={handleSucess}
            />
          ) : (
            <Login
              handleflipLogin={handleflipLogin}
              handleLoginSucess={handleLoginSucess}
              handleCloseModal={handleCloseModal}
            />
          )}
        </Box>
      </Modal>
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
