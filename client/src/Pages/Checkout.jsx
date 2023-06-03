import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Checkout = () => {
  const navigate = useNavigate();

  // navigate("/checkout");

  return (
    <div>
      {/* <NavBar /> */}
      <div
        className="d-flex flex-column align-items-center justify-content-center "
        height={"100vh"}
      >
        <img
          src={`https://m.media-amazon.com/images/I/61hfWhj5lAL.jpg`}
          alt={
            "Thank You for your Order - Your Order Has Been Sucessfully Placed"
          }
          loading="lazy"
          height={"400px"}
          width={"300px"}
          style={{ padding: "20px" }}
        />
        <Button variant="contained" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
