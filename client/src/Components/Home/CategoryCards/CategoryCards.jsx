import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Grid, Typography } from "@mui/material";
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
        spacing={{ xs: 1, md: 3 }}
      >
        <Grid
          item
          onClick={() => {
            navigate(`/Category/Books`);
          }}
        >
          <Card sx={{ maxWidth: { xs: 130, md: 180 }, minWidth: { md: 180 } }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="240"
                image={require("../../../Asserts/Category/Books.png")}
                alt="green iguana"
              />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(26, 0, 14, 0.29)",
                  color: "#ffffff",
                  fontWeight: "bold",
                  padding: "8px",
                }}
              >
                Books
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid
          item
          onClick={() => {
            navigate(`/Category/Furniture`);
          }}
        >
          <Card sx={{ minWidth: { md: 180 }, maxWidth: { xs: 130, md: 180 } }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="240"
                image={require("../../../Asserts/Category/Furniture.png")}
                alt="green iguana"
              />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(26, 0, 14, 0.29)",
                  color: "#ffffff",
                  fontWeight: "bold",
                  padding: "8px",
                }}
              >
                Furniture
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid
          item
          onClick={() => {
            navigate(`/Category/Electronics`);
          }}
        >
          <Card sx={{ minWidth: { md: 180 }, maxWidth: { xs: 130, md: 180 } }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="240"
                image={require("../../../Asserts/Category/Tech.png")}
                alt="green iguana"
              />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(26, 0, 14, 0.29)",
                  color: "#ffffff",
                  fontWeight: "bold",
                  padding: "8px",
                }}
              >
                Electronics
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item onClick={() => navigate("/Category/Travel")}>
          <Card sx={{ minWidth: { md: 180 }, maxWidth: { xs: 130, md: 180 } }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="240"
                image={require("../../../Asserts/Category/Travel.png")}
                alt="green iguana"
              />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(26, 0, 14, 0.29)",
                  color: "#ffffff",
                  fontWeight: "bold",
                  padding: "8px",
                }}
              >
                Travel
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item onClick={() => navigate("/Category/Mobiles")}>
          <Card sx={{ minWidth: { md: 180 }, maxWidth: { xs: 130, md: 180 } }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="240"
                image={require("../../../Asserts/Category/Mobile.png")}
                alt="green iguana"
                sx={{
                  position: "relative",
                }}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(26, 0, 14, 0.29)",
                  color: "#ffffff",
                  fontWeight: "bold",
                  padding: "8px",
                }}
              >
                Mobiles
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default CategoryCards;
