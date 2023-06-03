import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./ProductsCard.css";
import { productContext } from "../../../UseContext/ProductContext";

const ProductsCard = () => {
  // const url = `${process.env.REACT_APP_API}ecomm/api/v1/products`;

  // const [fetchedData, setFetchedData] = useState(null);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await axios.get(url);
  //     setFetchedData(data);
  //   };
  //   getData();
  // }, []);

  const { ProductData, fetchProducts, CreateProduct, DeleteProduct } =
    useContext(productContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="Heading">Latest Products On Sale</h1>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 2, md: 3 }}
      >
        {ProductData ? (
          ProductData.reverse().map((items, i) => (
            <Grid item key={i}>
              <Card sx={{ maxWidth: 200, minHeight: 350 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="240"
                    image={items.imageUrl}
                    alt="Redmi 11"
                    sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                    onClick={() => navigate(`/products/${items._id}`)}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        lineHeight: "1.5em",
                        height: "3em",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "100%",
                      }}
                    >
                      {items.name}
                    </Typography>
                    <Box>
                      <Button
                        variant="contained"
                        onClick={() => navigate(`/products/${items._id}`)}
                      >
                        View
                      </Button>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <></>
        )}
      </Grid>
    </div>
  );
};

export default ProductsCard;
