import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const CardItems = ({ isUpdated, setIsUpdated }) => {
  const [productId, setProductId] = useState("");
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const handleSucess = () => {
    setOpenSnackBar(true);
    setIsUpdated(true);
  };

  const handleError = () => {
    setOpenError(true);
    setIsUpdated(true);
  };
  const handleClosesnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
    setOpenSnackBar(false);
    setIsUpdated(false);
  };

  const url =
    "https://senthiltechspot-ecommerce-api.onrender.com/ecomm/api/v1/products";

  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(url);
      setFetchedData(data);
    };
    getData();
  }, [url]);

  const token = cookies.get("accessToken");
  // Handle Create Request
  const configuration = {
    method: "post",
    url: "https://senthiltechspot-ecommerce-api.onrender.com/ecomm/api/v1/cart/add",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    data: {
      productId: productId,
      quantity: 1,
    },
  };

  const AddToCart = async (id) => {
    setProductId(id);
    axios(configuration)
      .then((result) => {
        handleSucess();
      })
      .catch((error) => {
        handleError();
        console.log(error);
      });
  };
  return (
    <div>
      <h1 className="Heading">On Sale {params.category}</h1>
      <div className="d-flex flex-wrap justify-content-evenly gap-3">
        {fetchedData
          ? fetchedData
              .filter((products) => products.category == params.category)
              .map((items) => (
                <Card
                  sx={{
                    maxWidth: 280,
                    margin: "0 auto",
                    padding: "0.1em",
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
                      <Typography gutterBottom variant="h5" component="div">
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
                      <div className="d-flex gap-3">
                        <button
                          className="btn btn-primary"
                          onClick={() => AddToCart(items._id)}
                        >
                          Add to Cart
                        </button>
                        <button href="#" className="btn btn-warning">
                          Buy Now
                        </button>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))
          : "No Products Found"}
      </div>
      {/* Alert Notification Bar */}
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
      </Snackbar>
    </div>
  );
};

export default CardItems;
