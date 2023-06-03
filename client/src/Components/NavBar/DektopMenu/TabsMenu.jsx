import { Button, Menu, MenuItem, Tab, Tabs } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const TabsMenu = () => {
  const navigate = useNavigate();

  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Tabs
      indicatorColor="secondary"
      value={value}
      onChange={(e, val) => setValue(val)}
    >
      <Tab value="one" label="Home" onClick={() => navigate(`/`)} />

      <Tab value="two" label="Category" onClick={() => navigate(`/Category`)} />

      <Tab
        value="three"
        label="About Us"
        onClick={() => navigate(`/about-us`)}
      />
    </Tabs>
  );
};

export default TabsMenu;
