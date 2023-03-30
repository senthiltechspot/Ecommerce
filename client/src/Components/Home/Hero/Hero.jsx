import React from "react";
import "./Hero.css";
const Hero = () => {
  return (
    <div className="Hero">
      <img
        src={require("../../../Asserts/Hero.png")}
        alt=""
        className="heroimg"
      />
    </div>
  );
};

export default Hero;
