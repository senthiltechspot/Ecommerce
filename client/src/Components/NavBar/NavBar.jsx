import React, { useState } from "react";
import {
  AppBar,
  Grid,
  Toolbar,
  Typography,
  Box,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DrawerComp from "./DrawerComp";
import Cookies from "universal-cookie";
import AuthModal from "./AuthModal/AuthModal";
import CartIcon from "./CartIcon/CartIcon";
import HandleLogout from "../../Handlers/HandleLogout";
import AvatarMenu from "./DektopMenu/AvatarMenu";
import TabsMenu from "./DektopMenu/TabsMenu";

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
  //   Drawer Comp
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  // Using Cookies
  // Handle Users
  const token = cookies.get("accessToken");
  const username = cookies.get("username");
  const userType = cookies.get("userType");

  // Logout User
  const handlelogout = () => {
    HandleLogout();
  };

  // Modal Handlers
  const [openModal, setopenModal] = useState(false);

  const handleOpenModal = () => setopenModal(true);
  const handleCloseModal = () => setopenModal(false);

  return (
    <div className="NavBar">
      <AppBar sx={{ backgroundColor: "white" }} position="static">
        <Toolbar>
          <Grid sx={{ placeItems: "center" }} container>
            {isMatch == true ? (
              // Mobile View
              <>
                <Grid item xs={4}>
                  <Typography sx={{ color: "black" }}>Ecommerce App</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Box display="flex">
                    <CartIcon />
                    <DrawerComp
                      username={username}
                      handlelogout={handlelogout}
                      handleOpenModal={handleOpenModal}
                    />
                  </Box>
                </Grid>
              </>
            ) : (
              // {/* Desktop View */}
              <>
                <Grid item xs={2}>
                  <Typography sx={{ color: "black" }}>Ecommerce App</Typography>
                </Grid>
                <Grid item xs={6}>
                  <TabsMenu />
                </Grid>
                <Grid item xs={4}>
                  <Box display="flex">
                    {token ? (
                      // If User Logged in
                      <AvatarMenu username={username} userType={userType} />
                    ) : (
                      // If User Not Logged in
                      <>
                        <Box sx={{ marginLeft: "auto" }}>
                          <Button
                            sx={{ marginLeft: "auto" }}
                            variant="contained"
                            onClick={handleOpenModal}
                          >
                            Login / Register
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
      {/* Modal */}
      <AuthModal openModal={openModal} handleCloseModal={handleCloseModal} />
    </div>
  );
};

export default NavBar;
