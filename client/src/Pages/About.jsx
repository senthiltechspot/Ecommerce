import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import Button from "@mui/material/Button";

const About = () => {
  return (
    <div>
      {/* <NavBar /> */}
      <h1>About us</h1>
      <div
        className="d-flex flex-column align-items-center justify-content-center "
        height={"100vh"}
      >
        <img
          src={`https://www.searchenginejournal.com/wp-content/uploads/2022/01/about-us-page-examples-1-61fd8f9784626-sej-384x202.jpg`}
          alt={"Thank You for Knowing About Us"}
          loading="lazy"
          height={"70%"}
          width={"70%"}
        />
        <Button variant="contained" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default About;
