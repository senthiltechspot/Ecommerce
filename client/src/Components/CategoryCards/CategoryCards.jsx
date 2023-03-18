import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import "./CategoryCards.css";
const CategoryCards = () => {
  return (
    <div>
      <h1 className="Heading">Shop By Category</h1>
      <div className="CardsCollection d-flex gap-3">
        <Card sx={{ maxWidth: 300 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={require("../../Asserts/Category/Books.png")}
              alt="green iguana"
            />
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 300 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={require("../../Asserts/Category/Furniture.png")}
              alt="green iguana"
            />
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 300 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={require("../../Asserts/Category/Tech.png")}
              alt="green iguana"
            />
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 200 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={require("../../Asserts/Category/Clothing.png")}
              alt="green iguana"
            />
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 300 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={require("../../Asserts/Category/Travel.png")}
              alt="green iguana"
            />
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 180 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={require("../../Asserts/Category/Mobile.png")}
              alt="green iguana"
            />
          </CardActionArea>
        </Card>
        
      </div>
    </div>
  );
};

export default CategoryCards;
