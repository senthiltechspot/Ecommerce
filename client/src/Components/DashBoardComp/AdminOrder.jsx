import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import Createdata from "./SmallComp/Createdata";
import InteractiveList from "./SmallComp/InteractiveList";
import OrderList from "./OrderComp/OrderList";

const AdminOrder = () => {
  const [searchProductname, setSearchProductname] = React.useState(null);
  const [searchOrderUser, setSearchOrderUser] = React.useState(null);

  const orderurl = `${process.env.REACT_APP_API}ecomm/api/v1/orders`;

  return (
    <div>
      <div className="d-flex justify-content-evenly gap-3">
        <Typography variant="h3">Orders</Typography>
        <TextField
          fullWidth
          label="Search By Order Id/User Id"
          id="fullWidth"
          value={searchProductname}
          onChange={(e) => {
            setSearchProductname(e.target.value);
            setSearchOrderUser(e.target.value);
          }}
        />
      </div>
      <div className="d-flex justify-content-around gap-3 ">
        <div className="p-2 flex-grow-1">
          <OrderList
            Url={orderurl}
            from={"Orders"}
            searchProductname={searchProductname}
            searchOrderUser={searchOrderUser}
          />
        </div>
        <div className="p-2 ">
          {/* <Createdata url={Producturl} categoryurl={categoryurl} /> */}
        </div>
      </div>
    </div>
  );
};

export default AdminOrder;
