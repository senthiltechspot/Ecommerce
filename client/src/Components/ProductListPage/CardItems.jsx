import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const CardItems = () => {
  const [productId, setProductId] = useState("");

  const params = useParams();
  const navigate = useNavigate();

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
        // handleClick();
        // handleSucess();
        // handleflipLogin();
      })
      .catch((error) => {
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
                      <p className="card-text">
                        ₹{items.price}{" "}
                        <a className="text-decoration-line-through">
                          ₹{Math.floor((items.price / 100) * 20) + items.price}{" "}
                        </a>
                        <a className="text-success text-decoration-none">
                          20% Off
                        </a>
                      </p>
                      <Button
                        className="btn btn-primary"
                        onClick={() => AddToCart(items._id)}
                      >
                        Add to Cart
                      </Button>
                      <a href="#" className="btn btn-warning">
                        Buy Now
                      </a>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))
          : "No Products Found"}
      </div>
    </div>
  );
};

export default CardItems;
