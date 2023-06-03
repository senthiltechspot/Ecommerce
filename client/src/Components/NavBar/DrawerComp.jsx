import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItem,
  Divider,
} from "@mui/material";
import { MenuRounded, Logout } from "@mui/icons-material";
import { Box } from "@mui/system";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const DrawerComp = ({ username, handlelogout, handleOpenModal }) => {
  const [open, setOpen] = useState();

  const [Listopen, setListOpen] = React.useState(true);

  const handleClick = () => {
    setListOpen(!Listopen);
  };
  const drawerWidth = 240;

  const navigate = useNavigate();

  return (
    <div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        variant="temporary"
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <List>
          <ListItem
            disablePadding
            onClick={() => {
              setOpen(false);
              navigate(`/`);
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>

          <Divider />
          <ListItem disablePadding onClick={handleClick}>
            <ListItemButton>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary={"Category"} />
            </ListItemButton>
            {Listopen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Divider />

          <Collapse in={Listopen} timeout="auto" unmountOnExit>
            {["Electronics", "Furniture", "Mobiles", "Books"].map(
              (text, index) => (
                <ListItem
                  key={text}
                  disablePadding
                  onClick={() => {
                    setOpen(false);
                    navigate(`/Category/${text}`);
                  }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <NavigateNextIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </Collapse>
          <Divider />

          <ListItem
            disablePadding
            onClick={() => {
              setOpen(false);
              navigate(`/about-us`);
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={"About"} />
            </ListItemButton>
          </ListItem>
          <Divider />
          {username ? (
            <>
              <ListItem
                disablePadding
                onClick={() => {
                  setOpen(false);
                  navigate(`/dashboard`);
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={"DashBoard"} />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem
                disablePadding
                onClick={() => {
                  setOpen(false);
                  handlelogout();
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  <ListItemText primary={"LogOut"} />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <>
              {" "}
              <ListItem
                disablePadding
                onClick={() => {
                  setOpen(false);
                  handleOpenModal();
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Login"} />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
        <Divider />
      </Drawer>
      <Box display="flex">
        <IconButton sx={{ marginLeft: "auto" }} onClick={() => setOpen(!open)}>
          <MenuRounded />
        </IconButton>
      </Box>
    </div>
  );
};

export default DrawerComp;
