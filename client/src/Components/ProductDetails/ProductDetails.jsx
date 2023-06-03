import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box, CardMedia, Grid } from "@mui/material";
import { AddBoxOutlined } from "@mui/icons-material";
import { padding } from "@mui/system";
import { alertContext } from "../../UseContext/AlertContext";
import AddToCart from "../../Handlers/AddToCart";
import { cartContext } from "../../UseContext/CartContext";

const cookies = new Cookies();

const ProductDetails = ({ isUpdated, setIsUpdated }) => {
  const params = useParams();
  const navigate = useNavigate();
  const token = cookies.get("accessToken");

  const url = `${process.env.REACT_APP_API}ecomm/api/v1/products/${params.id}`;

  const [fetchedData, setFetchedData] = useState(null);

  const { totalCartItems, fetchCartItems } = useContext(cartContext);

  const value = useContext(alertContext);
  const { setOpenAlert, setMessage, setAlertType, setOpenBackDrop } = value;

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(url);
      setFetchedData(data);
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
      <Box>
        {fetchedData ? (
          <Grid container sx={{ placeItems: "center", padding: "20px" }}>
            <Grid
              item
              sm={6}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={fetchedData.imageUrl}
                style={{
                  height: "50vh",
                  width: "50vh",
                  padding: "50px",
                }}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box>
                <Typography gutterBottom variant="h5" component="div">
                  {fetchedData.name}
                </Typography>

                <p className="card-text d-flex gap-2 justify-content-center">
                  ₹{fetchedData.price}{" "}
                  <a className="text-decoration-line-through">
                    ₹
                    {Math.floor((fetchedData.price / 100) * 20) +
                      fetchedData.price}{" "}
                  </a>
                  <a className="text-success text-decoration-none">20% Off</a>
                </p>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() =>
                      AddToCart(
                        fetchedData._id,
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
                    onClick={() => BuyNow(fetchedData._id)}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        ) : (
          "No Products Found"
        )}
      </Box>

      {fetchedData ? (
        <Box>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            padding={"10px"}
          >
            Description
          </Typography>
          <Typography
            variant="h8"
            // padding={"20px"}
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              padding: "20px",
            }}
          >
            {fetchedData.description}
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            Description
          </Typography>
          <Typography variant="h8">"No Data Found"</Typography>
        </Box>
      )}
      {/* Alert Notification Bar */}
      {/* <Snackbar
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
        open={openLoginError}
        autoHideDuration={6000}
        onClose={handleClosesnackbar}
      >
        <Alert
          onClose={handleClosesnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          Kindly Login Before Adding To Cart
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

export default ProductDetails;
