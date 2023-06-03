import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  CardActionArea,
  Grid,
  Button,
  Typography,
  CardMedia,
  CardContent,
  Card,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { alertContext } from "../../UseContext/AlertContext";
import AddToCart from "../../Handlers/AddToCart";
import { cartContext } from "../../UseContext/CartContext";

const cookies = new Cookies();

const CardItems = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { totalCartItems, fetchCartItems } = useContext(cartContext);

  const value = useContext(alertContext);
  const { setOpenAlert, setMessage, setAlertType, setOpenBackDrop } = value;

  const url = `${process.env.REACT_APP_API}ecomm/api/v1/products`;

  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(url);
      if (params.category) {
        let FilteredData = data.filter(
          (products) => products.category == params.category
        );
        setFetchedData(FilteredData);
      } else {
        setFetchedData(data);
      }
    };
    getData();
  }, []);

  const BuyNow = (id) => {
    AddToCart(
      id,
      setOpenAlert,
      setOpenBackDrop,
      setMessage,
      setAlertType,
      fetchCartItems
    )
      .then(() => {
        navigate(`/cart`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className="Heading">On Sale {params.category}</h1>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 2, md: 3 }}
      >
        {fetchedData.length > 0
          ? fetchedData.map((items) => (
              <Grid item key={items._id}>
                <Card
                  sx={{
                    minWidth: 280,
                    maxWidth: 280,
                    margin: "0 auto",
                    padding: "0.1em",
                    minHeight: 450,
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      className={"Media"}
                      component="img"
                      height="240"
                      width={"100"}
                      image={items.imageUrl}
                      alt="No image Found"
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
                      {/* <Button variant="contained">View</Button> */}
                      <p className="card-text d-flex gap-2 justify-content-center">
                        ₹{items.price}{" "}
                        <a className="text-decoration-line-through">
                          ₹{Math.floor((items.price / 100) * 20) + items.price}{" "}
                        </a>
                        <a className="text-success text-decoration-none">
                          20% Off
                        </a>
                      </p>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          justifyContent: "space-around",
                        }}
                      >
                        {items.Qty > 0 ? (
                          <>
                            <Button
                              variant="contained"
                              onClick={() =>
                                AddToCart(
                                  items._id,
                                  setOpenAlert,
                                  setOpenBackDrop,
                                  setMessage,
                                  setAlertType,
                                  fetchCartItems
                                )
                              }
                            >
                              Add to Cart
                            </Button>
                            <Button
                              variant="contained"
                              sx={{ bgcolor: "warning.main" }}
                              onClick={() => BuyNow(items._id)}
                            >
                              Buy Now
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="contained"
                            sx={{ bgcolor: "warning.main" }}
                            disabled
                          >
                            Sold Out
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          : "No Products Found"}
      </Grid>
      {/* Alert Notification Bar
      <Snackbar
        open={openLoginError}
        autoHideDuration={6000}
        onClose={handleClosesnackbar}
      >
        <Alert
          onClose={handleClosesnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          Kindly Login Before add To Cart
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleClosesnackbar}
      >
        <Alert
          onClose={handleClosesnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          Cart Add Failed Kindly Retry
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleClosesnackbar}
      >
        <Alert
          onClose={handleClosesnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Sucessfully Added to Cart
        </Alert>
      </Snackbar> */}
    </div>
  );
};

export default CardItems;
