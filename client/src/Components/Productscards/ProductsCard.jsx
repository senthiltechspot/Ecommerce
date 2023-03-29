import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./ProductsCard.css";
const ProductsCard = () => {
  const url =
    "https://senthiltechspot-ecommerce-api.onrender.com/ecomm/api/v1/products";

  const [fetchedData, setFetchedData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(url);
      setFetchedData(data);
    };
    getData();
  }, [url]);

  return (
    <div>
      <h1 className="Heading">Latest Products On Sale</h1>
      <div className="ProductCollection d-flex flex-wrap gap-3 justify-content-center">
        {fetchedData ? (
          fetchedData.reverse().map((items) => (
            <Card sx={{ maxWidth: 200 }}>
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
                  <Typography gutterBottom variant="h5" component="div">
                    {items.name}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/products/${items._id}`)}
                  >
                    View
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ProductsCard;
