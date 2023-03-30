import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Grid } from "@mui/material";
import "./CategoryCards.css";
import { useNavigate } from "react-router-dom";

const CategoryCards = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="Heading">Shop By Category</h1>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 2, md: 3 }}
      >
        <Grid
          item
          onClick={() => {
            navigate(`/Category/Books`);
          }}
        >
          <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="240"
                image={require("../../../Asserts/Category/Books.png")}
                alt="green iguana"
              />
            </CardActionArea>
          </Card>
        </Grid>
        <Grid
          item
          onClick={() => {
            navigate(`/Category/Furniture`);
          }}
        >
          <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="240"
                image={require("../../../Asserts/Category/Furniture.png")}
                alt="green iguana
                "
              />
            </CardActionArea>
          </Card>
        </Grid>
        <Grid
          item
          onClick={() => {
            navigate(`/Category/Electronics`);
          }}
        >
          <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="240"
                image={require("../../../Asserts/Category/Tech.png")}
                alt="green iguana"
              />
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item onClick={() => navigate("/Category/Travel")}>
          <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="240"
                image={require("../../../Asserts/Category/Travel.png")}
                alt="green iguana"
              />
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item onClick={() => navigate("/Category/Mobile")}>
          <Card sx={{ maxWidth: 180 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="240"
                image={require("../../../Asserts/Category/Mobile.png")}
                alt="green iguana"
              />
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default CategoryCards;