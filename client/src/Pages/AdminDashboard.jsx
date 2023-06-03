import React, { useContext } from "react";
import NavBar from "../Components/NavBar/NavBar";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AdminCategory from "../Components/DashBoardComp/AdminCategory";
import AdminProduct from "../Components/DashBoardComp/AdminProduct";
import AdminOrder from "../Components/DashBoardComp/AdminOrder";
import { alertContext } from "../UseContext/AlertContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const AdminDashboard = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {
    OpenAlert,
    setOpenAlert,
    Message,
    setMessage,
    AlertType,
    setAlertType,
    openBackDrop,
    setOpenBackDrop,
  } = useContext(alertContext);

  return (
    <div>
      {/* <NavBar /> */}
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Category" {...a11yProps(0)} />
            <Tab label="Products" {...a11yProps(1)} />
            <Tab label="Orders" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AdminCategory
            setOpenAlert={setOpenAlert}
            setMessage={setMessage}
            setAlertType={setAlertType}
            setOpenBackDrop={setOpenBackDrop}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AdminProduct />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AdminOrder />
        </TabPanel>
      </Box>
    </div>
  );
};

export default AdminDashboard;
