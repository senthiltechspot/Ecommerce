import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const cookies = new Cookies();

const ProductDetails = ({ isUpdated, setIsUpdated }) => {
  const params = useParams();
  const navigate = useNavigate();
  const token = cookies.get("accessToken");

  const url = `https://senthiltechspot-ecommerce-api.onrender.com/ecomm/api/v1/products/${params.id}`;

  const [fetchedData, setFetchedData] = useState(null);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [productId, setProductId] = useState("");

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
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(url);
      setFetchedData(data);
    };
    getData();
  }, [url]);
  
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
      <div
        className="d-flex flex-wrap justify-content-evenly align-items-center gap-3 p-5"
        height={"100%"}
      >
        {fetchedData ? (
          <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
            <img
              src={fetchedData.imageUrl}
              alt={"Image Not Found"}
              loading="lazy"
              height={"480px"}
              width={"500px"}
              style={{ objectFit: "contain" }}
            />
            <div>
              <Typography gutterBottom variant="h5" component="div">
                {fetchedData.name}
              </Typography>

              {/* <Button variant="contained">View</Button> */}
              <p className="card-text d-flex gap-2 justify-content-center">
                ₹{fetchedData.price}{" "}
                <a className="text-decoration-line-through">
                  ₹
                  {Math.floor((fetchedData.price / 100) * 20) +
                    fetchedData.price}{" "}
                </a>
                <a className="text-success text-decoration-none">20% Off</a>
              </p>
              <div className="d-flex justify-content-evenly gap-3">
                <button
                  className="btn btn-primary"
                  onClick={() => AddToCart(fetchedData._id)}
                >
                  Add to Cart
                </button>
                <button href="#" className="btn btn-warning">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          "No Products Found"
        )}
      </div>
      {fetchedData ? (
        <div className="p-4">
          <Typography gutterBottom variant="h5" component="div">
            Description
          </Typography>
          <Typography variant="h8">{fetchedData.description}</Typography>
        </div>
      ) : (
        <div>
          <Typography gutterBottom variant="h5" component="div">
            Description
          </Typography>
          <Typography variant="h8">"No Data Found"</Typography>
        </div>
      )}
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

export default ProductDetails;
