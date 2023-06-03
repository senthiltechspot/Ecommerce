import React from "react";
import HandleLogout from "../../../Handlers/HandleLogout";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import CartIcon from "../CartIcon/CartIcon";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AvatarMenu = ({ username, userType }) => {
  const navigate = useNavigate();

  // User/Avatar Menu Drop Handler
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ marginLeft: "auto" }}>
        <CartIcon />
        {/* Avatar with drop menu */}
        <Tooltip title="Account settings" sx={{ marginLeft: "auto" }}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {username ? username[0] : "A"}
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
            {username ? `Hi ${username}` : "Login"}
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => navigate("/dashboard")}>
            <Avatar /> DashBoard
          </MenuItem>
          <Divider />

          {/* <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <ShoppingCartIcon fontSize="small" />
        </ListItemIcon>
        Cart
      </MenuItem> */}
          <MenuItem onClick={HandleLogout}>
            <ListItemIcon onClick={HandleLogout}>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>

          {userType === "ADMIN" ? (
            <MenuItem onClick={() => navigate("/admin-dashboard")}>
              <Avatar /> Admin DashBoard
            </MenuItem>
          ) : (
            <></>
          )}
        </Menu>
      </Box>
    </>
  );
};

export default AvatarMenu;
