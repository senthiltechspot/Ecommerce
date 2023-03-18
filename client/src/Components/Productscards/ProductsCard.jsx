import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";

import "./ProductsCard.css";
const ProductsCard = () => {
  return (
    <div>
      <h1 className="Heading">On Sale</h1>
      <div className="ProductCollection d-flex gap-3">
        <Card sx={{ maxWidth: 300 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={require("../../Asserts/Products/redmi11.jpg")}
              alt="Redmi 11"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Redmi 11 5G
              </Typography>
              <Button variant="contained">View</Button>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 300 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="240"
              image={require("../../Asserts/Products/iqqz6.jpg")}
              alt="iqzz6"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                IQOO Z6
              </Typography>
              <Button variant="contained">View</Button>
            </CardContent>
          </CardActionArea>
        </Card>

      </div>
    </div>
  );
};

export default ProductsCard;
